'use client';

import { useState, useRef } from 'react';

type Language = 'en' | 'zh';

const translations = {
  en: {
    title: 'Offline OCR: Math & Text',
    subtitle: 'Convert images and formulas to editable text instantly',
    dragDrop: 'Drag & drop your image here or',
    browse: 'browse files',
    selectImage: 'Please select an image first',
    recognizing: 'Recognizing text...',
    startRecognition: 'Start Recognition',
    error: 'Recognition failed',
    results: 'Recognition Results',
    noText: 'No text detected',
    viewDetails: 'View Line Details',
    copy: 'Copy to Clipboard',
    download: 'Download as TXT',
    copySuccess: 'Copied to clipboard!',
    features: 'Why Choose Offline OCR?',
    feature1: 'Instant Recognition',
    feature1Desc: 'Process images in milliseconds',
    feature2: 'Privacy First',
    feature2Desc: 'All processing happens locally on your device',
    feature3: 'Free & Open',
    feature3Desc: 'No registration or hidden fees required',
    feature4: 'Multiple Languages',
    feature4Desc: 'Support for multiple languages',
    downloadApp: 'Download Mobile App',
    appBenefit: 'Get more features on mobile',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    selectedFile: 'Selected file',
    footer: '© 2025 Offline OCR: Math & Text. All rights reserved.',
  },
  zh: {
    title: 'Offline OCR：数学公式与文字识别',
    subtitle: '一键将图片和公式转换为可编辑文本',
    dragDrop: '拖拽图片到这里或',
    browse: '选择文件',
    selectImage: '请先选择一张图片',
    recognizing: '正在识别...',
    startRecognition: '开始识别',
    error: '识别失败',
    results: '识别结果',
    noText: '未检测到文字',
    viewDetails: '查看行详情',
    copy: '复制到剪贴板',
    download: '下载为TXT文件',
    copySuccess: '已复制到剪贴板！',
    features: '为什么选择 Offline OCR?',
    feature1: '极速识别',
    feature1Desc: '毫秒级处理图片',
    feature2: '隐私保护',
    feature2Desc: '所有处理在本地进行，无需上传',
    feature3: '完全免费',
    feature3Desc: '无需注册，没有隐藏费用',
    feature4: '多语言支持',
    feature4Desc: '支持多种语言',
    downloadApp: '下载移动应用',
    appBenefit: '手机端获得更多功能',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    selectedFile: '已选文件',
    footer: '© 2025 Offline OCR 文字识别。保留所有权利。',
  },
};

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ text: string; lines: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [showDetails, setShowDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragRef.current) {
      dragRef.current.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
      dragRef.current.style.borderColor = '#8b5cf6';
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragRef.current) {
      dragRef.current.style.backgroundColor = 'transparent';
      dragRef.current.style.borderColor = '#e5e7eb';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragRef.current) {
      dragRef.current.style.backgroundColor = 'transparent';
      dragRef.current.style.borderColor = '#e5e7eb';
    }
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError(t.selectImage);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || t.error);
      }

      setResult(data);
      setShowDetails(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.text).then(() => {
        alert(t.copySuccess);
      });
    }
  };

  const downloadAsText = () => {
    if (result) {
      const element = document.createElement('a');
      const file = new Blob([result.text], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `offline-ocr-result-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Offline OCR
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Math & Text Recognition</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                language === 'en'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                language === 'zh'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300'
              }`}
            >
              中文
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t.subtitle}
          </p>
        </section>

        {/* Upload Section */}
        <section className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 mb-12">
          <div
            ref={dragRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center transition-all cursor-pointer hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-slate-600"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="mb-4 text-4xl">📸</div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {t.dragDrop} <span className="text-purple-600 font-medium">{t.browse}</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF up to 50MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload image"
            />
          </div>

          {/* File Preview */}
          {file && (
            <div className="mt-6 p-4 bg-purple-50 dark:bg-slate-600 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t.selectedFile}:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{file.name}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setResult(null);
                  setError('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
          )}

          {/* Recognition Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:shadow-lg active:scale-95'
            }`}
          >
            {loading ? `⏳ ${t.recognizing}` : `🚀 ${t.startRecognition}`}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
              <p className="text-red-700 dark:text-red-200">❌ {error}</p>
            </div>
          )}
        </section>

        {/* Results Section */}
        {result && (
          <section className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t.results}
            </h3>

            {/* Recognized Text */}
            <div className="mb-6 p-6 bg-gray-50 dark:bg-slate-600 rounded-lg border border-gray-200 dark:border-slate-500 max-h-64 overflow-y-auto">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                {result.text || t.noText}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={copyToClipboard}
                className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
              >
                📋 {t.copy}
              </button>
              <button
                onClick={downloadAsText}
                className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
              >
                💾 {t.download}
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all"
              >
                {showDetails ? '▲' : '▼'} {t.viewDetails}
              </button>
            </div>

            {/* Line Details */}
            {showDetails && result.lines.length > 0 && (
              <div className="border-t border-gray-200 dark:border-slate-500 pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Line-by-line Breakdown ({result.lines.length} lines)
                </h4>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {result.lines.map((line, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 dark:bg-slate-600 rounded border-l-4 border-purple-600"
                    >
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Line {idx + 1}:
                      </span>{' '}
                      <span className="text-gray-700 dark:text-gray-300">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Features Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            ⭐ {t.features}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.feature1, desc: t.feature1Desc, icon: '⚡' },
              { title: t.feature2, desc: t.feature2Desc, icon: '🔒' },
              { title: t.feature3, desc: t.feature3Desc, icon: '💎' },
              { title: t.feature4, desc: t.feature4Desc, icon: '🌍' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* App Promotion Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-xl p-12 text-white text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">📱 {t.downloadApp}</h3>
          <p className="text-lg mb-8 opacity-90">{t.appBenefit}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
            >
              🤖 {t.googlePlay}
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>{t.footer}</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="/privacy" className="hover:text-purple-600 transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-purple-600 transition">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-purple-600 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
