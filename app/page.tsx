// app/page.tsx
'use client';

import { useState } from 'react';

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ text: string; lines: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('请先选择一张图片');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      // ⚠️ 关键点：这里的 key 必须是 "file"，对应 Next.js API 和 FastAPI 的接收参数
      formData.append('file', file);

      const res = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || '上传失败');
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '识别过程发生错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">OCR 文字识别测试</h1>
        
        {/* 上传区域 */}
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* 预览区域 (可选) */}
        {file && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">已选文件: {file.name}</p>
          </div>
        )}

        {/* 按钮 */}
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
            ${loading || !file 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? '正在识别...' : '开始识别'}
        </button>

        {/* 错误提示 */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
            ❌ {error}
          </div>
        )}

        {/* 结果展示 */}
        {result && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">识别结果:</h3>
            <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap font-mono">
              {result.text || "未识别到文字"}
            </div>
            {result.lines.length > 0 && (
              <details className="mt-2 text-xs text-gray-500">
                <summary className="cursor-pointer hover:text-gray-700">查看行详情</summary>
                <ul className="mt-1 list-disc list-inside">
                  {result.lines.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
