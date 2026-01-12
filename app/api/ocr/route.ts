import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'tmp-uploads');
const CLEANUP_TIMEOUT = 24 * 60 * 60 * 1000; // 24 小时（毫秒）

export async function POST(request: NextRequest) {
  let uploadedFilePath: string | null = null;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // 验证文件大小（最多 10MB）
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File is too large. Maximum size is 10MB.' },
        { status: 413 }
      );
    }

    const OCR_API_URL = process.env.OCR_API_URL; // ✅ 不用 NEXT_PUBLIC_
    const OCR_API_KEY = process.env.OCR_API_KEY; // ✅ 如果需要认证

    if (!OCR_API_URL) {
      return NextResponse.json(
        { error: 'OCR service is not configured' },
        { status: 500 }
      );
    }

    // 转发原始 FormData 给 OCR API
    const forwardFormData = new FormData();
    forwardFormData.append('file', file);

    // ✅ 添加 timeout（30 秒）
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(`${OCR_API_URL}`, {
        method: 'POST',
        body: forwardFormData,
        headers: {
          // 如果需要认证，添加这行
          ...(OCR_API_KEY && { Authorization: `Bearer ${OCR_API_KEY}` }),
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`OCR API Error: ${response.status}`, errorText);

        // 返回更友好的错误信息
        if (response.status === 429) {
          return NextResponse.json(
            { error: 'Service is temporarily unavailable. Please try again later.' },
            { status: 503 }
          );
        }

        if (response.status === 413) {
          return NextResponse.json(
            { error: 'File is too large for processing.' },
            { status: 413 }
          );
        }

        throw new Error(`OCR API returned ${response.status}`);
      }

      const data = await response.json();

      // ✅ 验证返回数据结构
      if (!data.text || !Array.isArray(data.lines)) {
        return NextResponse.json(
          { error: 'Invalid response format from OCR service' },
          { status: 500 }
        );
      }

      return NextResponse.json(data);
    } catch (fetchError: any) {
      clearTimeout(timeout);

      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Please try with a smaller image.' },
          { status: 408 }
        );
      }

      console.error('Fetch error:', fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('API Error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { 
        error: 'Failed to process image',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

