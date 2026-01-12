import { NextRequest, NextResponse } from 'next/server';

const GRADIO_TIMEOUT = 30000; // 30 秒超时
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const JPG_QUALITY = 0.8; // JPG 压缩质量（0-1）

/**
 * 将图片压缩为 JPG 格式
 * @param file - 原始图片文件
 * @returns 压缩后的 File 对象
 */
async function compressImageToJPG(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = async (event) => {
      try {
        // 创建 Blob 用于 Image 加载
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: file.type });
        const url = URL.createObjectURL(blob);

        // 加载图片
        const img = new Image();
        img.src = url;

        img.onload = () => {
          try {
            // 创建 Canvas
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // 如果图片太大，自动缩小（最大宽度 2048px）
            if (width > 2048) {
              height = (height * 2048) / width;
              width = 2048;
            }

            canvas.width = width;
            canvas.height = height;

            // 绘制图片到 Canvas
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            // 转换为 JPG 并压缩
            canvas.toBlob(
              (jpgBlob) => {
                URL.revokeObjectURL(url);

                if (!jpgBlob) {
                  reject(new Error('Failed to compress image'));
                  return;
                }

                // 生成新文件名（改为 .jpg）
                const newFileName = file.name.replace(/\.[^.]+$/, '.jpg');

                // 创建新的 File 对象
                const compressedFile = new File([jpgBlob], newFileName, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });

                console.log(
                  `Image compressed: ${file.name} (${file.size} bytes) → ${newFileName} (${compressedFile.size} bytes)`
                );

                resolve(compressedFile);
              },
              'image/jpeg',
              JPG_QUALITY // 质量设置
            );
          } catch (error) {
            URL.revokeObjectURL(url);
            reject(error);
          }
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Failed to load image'));
        };
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
}

export async function POST(request: NextRequest) {
  try {
    // 获取环境变量
    const OCR_API_URL = process.env.OCR_API_URL;

    if (!OCR_API_URL) {
      return NextResponse.json(
        { error: 'OCR service is not configured' },
        { status: 500 }
      );
    }

    // 解析 FormData
    const formData = await request.formData();
    let file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log(`Received file: ${file.name} (${file.size} bytes, type: ${file.type})`);

    // ✅ 验证文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // ✅ 验证文件大小（压缩前）
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: 'File is too large. Maximum size is 10MB.',
          maxSize: MAX_FILE_SIZE,
          fileSize: file.size,
        },
        { status: 413 }
      );
    }

    // ✅ 如果不是 JPG，自动压缩转换
    if (file.type !== 'image/jpeg') {
      console.log(`Converting ${file.type} to JPG...`);
      try {
        file = await compressImageToJPG(file);
        console.log(`Conversion successful: ${file.name} (${file.size} bytes)`);
      } catch (compressionError) {
        console.error('Image compression failed:', compressionError);
        return NextResponse.json(
          { error: 'Failed to compress image. Please try another image.' },
          { status: 400 }
        );
      }
    } else {
      console.log(`File is already JPG, skipping compression`);
    }

    // ✅ 准备转发给 Gradio 的 FormData
    const forwardFormData = new FormData();
    forwardFormData.append('data', file);

    // ✅ 设置超时
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, GRADIO_TIMEOUT);

    try {
      console.log(`Sending request to OCR API: ${OCR_API_URL}/call/predict`);
      console.log(`File: ${file.name} (${file.size} bytes)`);

      // 调用 Gradio OCR API
      const response = await fetch(`${OCR_API_URL}/call/predict`, {
        method: 'POST',
        body: forwardFormData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // ✅ 处理 API 错误响应
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`OCR API Error: ${response.status}`, errorText);

        if (response.status === 429) {
          return NextResponse.json(
            {
              error: 'Service is temporarily unavailable (rate limited). Please try again later.',
            },
            { status: 503 }
          );
        }

        if (response.status === 413) {
          return NextResponse.json(
            { error: 'File is too large for processing.' },
            { status: 413 }
          );
        }

        if (response.status === 408) {
          return NextResponse.json(
            { error: 'Request timeout. Please try with a smaller image.' },
            { status: 408 }
          );
        }

        throw new Error(`OCR API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('OCR API response:', data);

      // ✅ 验证返回数据结构
      let processedData = data;

      // 如果 Gradio 返回的是 { data: [...] } 格式
      if (data.data && Array.isArray(data.data)) {
        processedData = data.data[0];
      }

      // 验证必要字段
      if (typeof processedData === 'string') {
        return NextResponse.json({
          text: processedData,
          lines: processedData.split('\n').filter((line) => line.trim()),
        });
      }

      if (processedData.text && Array.isArray(processedData.lines)) {
        return NextResponse.json(processedData);
      }

      console.warn('Unexpected response format:', processedData);
      return NextResponse.json({
        text: JSON.stringify(processedData),
        lines: [],
        raw: processedData,
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      if (fetchError.name === 'AbortError') {
        console.error('Request timeout after 30 seconds');
        return NextResponse.json(
          { error: 'Request timeout. Please try with a smaller image.' },
          { status: 408 }
        );
      }

      console.error('Fetch error:', fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('API Route Error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to process image',
        details:
          process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

// ✅ 可选：健康检查
export async function HEAD(request: NextRequest) {
  const OCR_API_URL = process.env.OCR_API_URL;

  if (!OCR_API_URL) {
    return NextResponse.json(
      { error: 'OCR service is not configured' },
      { status: 500 }
    );
  }

  try {
    const healthCheck = await fetch(`${OCR_API_URL}/info`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });

    if (healthCheck.ok) {
      return NextResponse.json({ status: 'ok' });
    }

    return NextResponse.json(
      { status: 'service unavailable' },
      { status: 503 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'service unavailable' },
      { status: 503 }
    );
  }
}


