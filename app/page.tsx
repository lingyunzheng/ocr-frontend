'use client';

import { useState, useRef } from 'react';

type Language = 'en' | 'zh';

const translations = {
  en: {
    title: 'Offline OCR: Math & Word',
    subtitle: 'Convert images and formulas to editable text instantly',
    demoNotice: 'This web page is an online demo for basic text recognition. For full dual-engine capabilities (free local mode & advanced cloud math formula parsing), please download our mobile app.',
    downloadAppCTA: 'Download App Now',
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
    feature2Desc: 'On-device mode processes files 100% locally with zero server upload',
    feature3: 'Dual-Engine Architecture',
    feature3Desc: 'Free local AI models for daily use, or opt-in Pro cloud mode for highest accuracy',
    feature4: 'Multiple Languages',
    feature4Desc: 'Support for multiple languages',
    downloadApp: 'Download Mobile App',
    appBenefit: 'Get full features and math formula support on mobile',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    selectedFile: 'Selected file',
    footer: '© 2026 Offline OCR. All rights reserved.',
    compressing: 'Compressing image...',
    imageSize: 'Image size',
  },
  zh: {
    title: 'Offline OCR：数学公式与文字识别',
    subtitle: '一键将图片和公式转换为可编辑文本',
    demoNotice: '此网页仅为在线演示版本，支持基础文字识别。想要体验完整的双引擎功能（免费本地离线识别 & 高级云端数学公式解析），请下载我们的手机 App。',
    downloadAppCTA: '立即下载 App',
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
    feature1Desc: '毫秒级高效处理图片',
    feature2: '隐私保护',
    feature2Desc: '默认本地模式下所有数据处理在设备端完成，零上传',
    feature3: '双引擎架构',
    feature3Desc: '日常使用完全免费的本地AI模型，也可选专业云端模式获取最高精度',
    feature4: '多语言支持',
    feature4Desc: '支持多种语言与复杂排版',
    downloadApp: '下载移动应用',
    appBenefit: '手机端获得完整离线处理与公式解析功能',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    selectedFile: '已选文件',
    footer: '© 2026 Offline OCR。保留所有权利。',
    compressing: '压缩中...',
    imageSize: '图片大小',
  },
};

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(''); // 预览图片
  const [result, setResult] = useState<{ text: string; lines: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [showDetails, setShowDetails] = useState(false);
  const [fileSize, setFileSize] = useState(''); // 显示文件大小
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  // 将图片压缩为 JPG
  const compressImageToJPG = (inputFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(inputFile);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // 如果图片太大，缩小尺寸（最大宽度 2048px）
          if (width > 2048) {
            height = (height * 2048) / width;
            width = 2048;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // 转换为 JPG，质量设置为 0.8（可根据需要调整）
          canvas.toBlob(
            (blob) => {
              if (blob) {
                // 生成新的 File 对象，保持原始文件名但改为 .jpg
                const newFile = new File(
                  [blob],
                  inputFile.name.replace(/\.[^.]+$/, '.jpg'),
                  { type: 'image/jpeg' }
                );
                resolve(newFile);
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            'image/jpeg',
            0.8 // JPG 质量（0-1，0.8 是平衡点）
          );
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
    });
  };

  // 格式化文件大小显示
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // 处理文件选择（包括预览和压缩准备）
  const handleFileSelect = async (selectedFile: File) => {
    setError('');
    setResult(null);

    // 显示预览
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);

    // 显示文件大小
    setFileSize(formatFileSize(selectedFile.size));

    // 暂时存储原文件，不立即压缩（等用户点击识别时再压缩）
    setFile(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
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
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // 处理上传和压缩
  const handleUpload = async () => {
    if (!file) {
      setError(t.selectImage);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 压缩图片为 JPG
      const compressedFile = await compressImageToJPG(file);

      const formData = new FormData();
      formData.append('file', compressedFile);

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
            <p className="text-sm text-gray-600 dark:text-gray-400">Math & Word Recognition</p>
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

          {/* Demo Notice 提示框（新增）*/}
          <div className="mx-auto max-w-2xl bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-2xl px-6 py-5 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex-1">
                <p className="text-blue-900 dark:text-blue-100 font-medium text-sm md:text-base">
                  ℹ️ {t.demoNotice}
                </p>
              </div>
              <a
                href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                📱 {t.downloadAppCTA}
              </a>
            </div>
          </div>
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

          {/* 图片预览 */}
          {preview && (
            <div className="mt-6 rounded-xl overflow-hidden border-2 border-purple-300 dark:border-purple-600 bg-gray-100 dark:bg-slate-600">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto object-contain max-h-96"
              />
            </div>
          )}

          {/* File Preview */}
          {file && (
            <div className="mt-6 p-4 bg-purple-50 dark:bg-slate-600 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">✓</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{t.selectedFile}:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t.imageSize}: {fileSize}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setPreview('');
                  setResult(null);
                  setError('');
                  setFileSize('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-4 text-xl"
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


