import { NextRequest, NextResponse } from 'next/server';

const GRADIO_TIMEOUT = 30000;

export async function POST(request: NextRequest) {
  try {
    const OCR_API_URL = process.env.OCR_API_URL;

    if (!OCR_API_URL) {
      return NextResponse.json(
        { error: 'OCR service is not configured' },
        { status: 500 }
      );
    }

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

    // ✅ 直接转发给 Gradio，让 Gradio 处理压缩
    const forwardFormData = new FormData();
    forwardFormData.append('data', file);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GRADIO_TIMEOUT);

    try {
      const response = await fetch(`${OCR_API_URL}/call/predict`, {
        method: 'POST',
        body: forwardFormData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`OCR API Error: ${response.status}`, errorText);
        throw new Error(`OCR API returned ${response.status}`);
      }

      const data = await response.json();

      // 处理响应
      let result = data.data?.[0] || data;

      if (typeof result === 'string') {
        return NextResponse.json({
          text: result,
          lines: result.split('\n').filter((l) => l.trim()),
        });
      }

      if (result.text && Array.isArray(result.lines)) {
        return NextResponse.json(result);
      }

      return NextResponse.json({
        text: JSON.stringify(result),
        lines: [],
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Try a smaller image.' },
          { status: 408 }
        );
      }

      throw fetchError;
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process image',
        details: process.env.NODE_ENV === 'development' && error instanceof Error
          ? error.message
          : undefined,
      },
      { status: 500 }
    );
  }
}


