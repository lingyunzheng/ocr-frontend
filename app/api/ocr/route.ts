import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const OCR_API_URL = process.env.NEXT_PUBLIC_OCR_API_URL;
    
    if (!OCR_API_URL) {
      return NextResponse.json(
        { error: '环境变量未设置: NEXT_PUBLIC_OCR_API_URL' },
        { status: 500 }
      );
    }
    
    // 调用 Hugging Face OCR API（没有 timeout）
    const response = await fetch(`${OCR_API_URL}/api/ocr`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OCR API 错误: ${response.status}`, errorText);
      throw new Error(`OCR API 返回错误: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API 异常:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    );
  }
}
