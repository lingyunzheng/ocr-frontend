import { NextRequest, NextResponse } from 'next/server';

const GRADIO_TIMEOUT = 30000;

export async function POST(request: NextRequest) {
  try {
    const OCR_API_URL = process.env.OCR_API_URL;
    console.log('[DEBUG] OCR_API_URL:', OCR_API_URL);

    if (!OCR_API_URL) {
      console.error('[ERROR] OCR_API_URL not configured');
      return NextResponse.json(
        { error: 'OCR service is not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    console.log('[DEBUG] File:', file?.name, file?.size);

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

    // 验证文件大小
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File is too large. Maximum size is 10MB.' },
        { status: 413 }
      );
    }

    const forwardFormData = new FormData();
    forwardFormData.append('file', file);  // FastAPI 用 'file' 字段

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GRADIO_TIMEOUT);

    try {
      // ✅ 改成 /api/ocr（FastAPI 端点）
      const requestUrl = `${OCR_API_URL}/api/ocr`;
      console.log('[DEBUG] Sending to:', requestUrl);

      const response = await fetch(requestUrl, {
        method: 'POST',
        body: forwardFormData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('[DEBUG] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[ERROR] API returned ${response.status}:`, errorText);
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      console.log('[DEBUG] Response:', data);

      // 处理 FastAPI 的响应格式
      if (data.success) {
        return NextResponse.json({
          text: data.text,
          lines: data.lines,
        });
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Try a smaller image.' },
          { status: 408 }
        );
      }

      console.error('[ERROR] Fetch error:', fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('[ERROR] API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

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


