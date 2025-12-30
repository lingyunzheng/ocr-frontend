'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
      setResult('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError('请选择图片');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const formData = new FormData();
      formData.append('file', image);


      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('OCR 识别失败');
      }

      const data = await response.json();
      setResult(data.text || JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            OCR 文字识别
          </h1>
          <p className="text-center text-gray-600 mb-8">
            上传图片，自动识别文字内容
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition">
              <label htmlFor="image" className="cursor-pointer">
                <div className="text-gray-600">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="font-medium">点击上传图片或拖拽</p>
                  <p className="text-sm text-gray-500">支持 JPG, PNG, GIF</p>
                </div>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {preview && (
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                ❌ {error}
              </div>
            )}

            {result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">✅ 识别结果</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!image || loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? '识别中...' : '开始识别'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
