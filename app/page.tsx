'use client';

import { useState, useRef, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface UserProfile {
  email: string;
  name: string;
  picture?: string;
}

type Language = 'en' | 'zh';

const AUTH_TOKEN_KEY = 'cloud_auth_token';
const AUTH_PROFILE_KEY = 'cloud_auth_profile';
const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;
const SUBSCRIPTION_API_URL = 'https://subscription.zhenglingyun.uk';

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax; Secure`;
}

function getCookie(name: string) {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
}

function saveAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  setCookie(AUTH_TOKEN_KEY, token, SESSION_MAX_AGE_SECONDS);
}

function loadAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || getCookie(AUTH_TOKEN_KEY);
}

function saveAuthProfile(profile: UserProfile) {
  localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(profile));
}

function loadAuthProfile(): UserProfile | null {
  try {
    const rawProfile = localStorage.getItem(AUTH_PROFILE_KEY);
    if (!rawProfile) return null;
    const profile = JSON.parse(rawProfile) as UserProfile;
    if (!profile.email) return null;
    return profile;
  } catch {
    localStorage.removeItem(AUTH_PROFILE_KEY);
    return null;
  }
}

function clearAuthStorage() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_PROFILE_KEY);
  deleteCookie(AUTH_TOKEN_KEY);
}

function isExpiredJwt(decoded: any) {
  return typeof decoded?.exp === 'number' && decoded.exp * 1000 <= Date.now();
}

async function exchangeGoogleTokenForSession(accessToken: string) {
  const res = await fetch(`${SUBSCRIPTION_API_URL}/api/login`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to create web session');
  }

  const data = await res.json();
  if (!data.token || !data.email) {
    throw new Error('Invalid web session response');
  }

  const profile: UserProfile = {
    email: data.email,
    name: data.name || data.email.split('@')[0],
    picture: data.picture || undefined,
  };

  saveAuthToken(data.token);
  saveAuthProfile(profile);
  return profile;
}

const translations = {
  en: {
    title: 'Offline OCR: Math & Word',
    subtitle: 'Convert images and formulas to editable text instantly',
    demoNotice: 'This web page is an online demo for basic text recognition. For full dual-engine capabilities (free local mode & advanced cloud math formula parsing), please download our mobile app.',
    downloadAppCTA: 'Download App Now',
    downloadWindowsCTA: 'Windows Desktop',
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
    pricingTitle: 'Simple, Transparent Pricing',
    pricingSubtitle: 'Unlock advanced features, ad-free processing, and high-accuracy cloud models.',
    pricingFreeTitle: 'Basic Mode',
    pricingFreePrice: '$0',
    pricingFreePeriod: 'forever',
    pricingFreeDesc: 'Ideal for daily offline text recognition',
    pricingFreeFeature1: '100% On-Device Local Processing',
    pricingFreeFeature2: 'Unlimited Text Scanning',
    pricingFreeFeature3: 'High-speed Local AI Model',
    pricingFreeFeature4: 'Zero Server Uploads (100% Private)',
    pricingFreeFeature5: 'Native Word (.docx) & PDF Export',
    pricingPlusTitle: 'Plus Plan',
    pricingPlusPrice: '$3.99',
    pricingPlusPeriod: 'month',
    pricingPlusDesc: 'Enhanced processing with an ad-free workflow',
    pricingPlusFeature1: '100% Ad-Free Experience',
    pricingPlusFeature2: 'High-Accuracy Formula Recognition',
    pricingPlusFeature3: 'Generous Credit Quota for Daily Use',
    pricingPlusFeature4: 'Enhanced Cloud Processing Speed',
    pricingPlusFeature5: 'Priority Customer Support',
    pricingProTitle: 'Pro Plan',
    pricingProPrice: '$5.99',
    pricingProPeriod: 'month',
    pricingProDesc: 'Elite AI capabilities for ultimate productivity',
    pricingProFeature1: 'Everything in Plus Plan',
    pricingProFeature2: 'Advanced AI Solver & Math Explainer',
    pricingProFeature3: 'Layout-Aware Structural Analysis',
    pricingProFeature4: 'Elite Credit Quota & Batch Processing',
    pricingProFeature5: 'Maximum Cloud Priority & Speed',
    pricingToggleMonthly: 'Monthly',
    pricingToggleYearly: 'Yearly',
    pricingYearlySave: 'Save ~17%',
    pricingPlusYearlyPrice: '$39.99',
    pricingPlusYearlyPeriod: 'year',
    pricingProYearlyPrice: '$59.99',
    pricingProYearlyPeriod: 'year',
    payWebSubscribe: 'Subscribe via Web',
    payAppGooglePlay: 'Subscribe via Android',
    checkoutErrorMsg: 'Failed to create checkout. Please try again later.',
  },
  zh: {
    title: 'Offline OCR：数学公式与文字识别',
    subtitle: '一键将图片和公式转换为可编辑文本',
    demoNotice: '此网页仅为在线演示版本，支持基础文字识别。想要体验完整的双引擎功能（免费本地离线识别 & 高级云端数学公式解析），请下载我们的手机 App。',
    downloadAppCTA: '立即下载 App',
    downloadWindowsCTA: 'Windows 桌面版',
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
    pricingTitle: '简单透明的定价',
    pricingSubtitle: '解锁高级功能、无广告体验以及高精度云端模型。',
    pricingFreeTitle: '基础模式',
    pricingFreePrice: '$0',
    pricingFreePeriod: '永久',
    pricingFreeDesc: '适合日常基础文字识别',
    pricingFreeFeature1: '100% 本地离线处理',
    pricingFreeFeature2: '无限次本地文字扫描识别',
    pricingFreeFeature3: '极速本地 AI 模型',
    pricingFreeFeature4: '零数据上传（完全保护隐私）',
    pricingFreeFeature5: '原生 Word (.docx) 与 PDF 导出',
    pricingPlusTitle: 'Plus 会员',
    pricingPlusPrice: '$3.99',
    pricingPlusPeriod: '月',
    pricingPlusDesc: '享受无广告和更流畅的高级识别体验',
    pricingPlusFeature1: '100% 纯净无广告体验',
    pricingPlusFeature2: '高精度数学公式与符号识别',
    pricingPlusFeature3: '每日宽裕的云端点数配额',
    pricingPlusFeature4: '更快的云端加速解析速度',
    pricingPlusFeature5: '专属客户技术支持',
    pricingProTitle: 'Pro 专业版',
    pricingProPrice: '$5.99',
    pricingProPeriod: '月',
    pricingProDesc: '专为高频专业需求打造的终极 AI 体验',
    pricingProFeature1: '包含 Plus 会员的全部权益',
    pricingProFeature2: '强大的 AI 解题与数学公式详解',
    pricingProFeature3: '智能版面还原与复杂表格分析',
    pricingProFeature4: '顶级云端点数配额与批量处理',
    pricingProFeature5: '最高优先级云端响应与极速体验',
    pricingToggleMonthly: '月付',
    pricingToggleYearly: '年付',
    pricingYearlySave: '省 ~17%',
    pricingPlusYearlyPrice: '$39.99',
    pricingPlusYearlyPeriod: '年',
    pricingProYearlyPrice: '$59.99',
    pricingProYearlyPeriod: '年',
    payWebSubscribe: '网页端订阅',
    payAppGooglePlay: '安卓 App 内订阅',
    checkoutErrorMsg: '创建支付链接失败，请稍后再试！',
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
  const [checkoutError, setCheckoutError] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  
  // Auth state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Check for SSO Token in URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Check URL for sso_token
      const urlParams = new URLSearchParams(window.location.search);
      const ssoToken = urlParams.get('sso_token');
      
      if (ssoToken) {
        try {
          const decoded = jwtDecode<any>(ssoToken);
          const profile: UserProfile = {
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture
          };
          setUserProfile(profile);
          saveAuthToken(ssoToken);
          saveAuthProfile(profile);
          
          // Remove token from URL for security and clean look
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {
          console.error("Invalid SSO token:", e);
        }
      } else {
        // 2. Check local storage
        const savedToken = loadAuthToken();
        if (savedToken) {
          try {
            const decoded = jwtDecode<any>(savedToken);
            if (isExpiredJwt(decoded)) {
              clearAuthStorage();
              return;
            }

            const savedProfile = loadAuthProfile();
            const email = decoded.email || savedProfile?.email;
            if (!email) return;

            const profile: UserProfile = {
              email,
              name: savedProfile?.name || decoded.name || email.split('@')[0],
              picture: savedProfile?.picture || decoded.picture
            };
            setUserProfile(profile);
            saveAuthProfile(profile);
          } catch (e) {
            const savedProfile = loadAuthProfile();
            if (savedProfile) {
              setUserProfile(savedProfile);
            }
          }
        }
      }
    }
  }, []);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const profile = await exchangeGoogleTokenForSession(tokenResponse.access_token);
        setUserProfile(profile);
      } catch (e) {
        console.error("Failed to sign in", e);
        clearAuthStorage();
      }
    },
    onError: errorResponse => console.error(errorResponse),
  });

  const handleLogout = () => {
    setUserProfile(null);
    clearAuthStorage();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  const handleWebSubscribe = async (plan: string) => {
    const token = loadAuthToken();
    if (!token) {
      loginWithGoogle();
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await fetch('https://subscription.zhenglingyun.uk/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      });
      if (res.status === 401) {
        clearAuthStorage();
        setUserProfile(null);
        loginWithGoogle();
        return;
      }
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setCheckoutError(true);
        setTimeout(() => setCheckoutError(false), 5000);
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      setCheckoutError(true);
      setTimeout(() => setCheckoutError(false), 5000);
    } finally {
      setCheckoutLoading(false);
    }
  };

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
          
          <div className="flex items-center gap-4">
            {/* Auth Section */}
            {userProfile ? (
              <div className="flex items-center gap-3 bg-white dark:bg-slate-700 px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-slate-600">
                {userProfile.picture ? (
                  <img src={userProfile.picture} alt="Avatar" className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                    {userProfile.name?.charAt(0) || userProfile.email?.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                  {userProfile.name || userProfile.email.split('@')[0]}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-xs text-red-500 hover:text-red-700 ml-1 font-medium"
                  title="Sign Out"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginWithGoogle()}
                className="flex items-center gap-2 bg-white dark:bg-slate-700 px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600 transition-all font-medium text-sm text-gray-700 dark:text-gray-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {language === 'zh' ? '登录' : 'Sign In'}
              </button>
            )}

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
              <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                <a
                  href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 text-center"
                >
                  📱 {t.downloadAppCTA}
                </a>
                <a
                  href="https://github.com/lingyunzheng/offline-ocr/releases/download/v0.1.0/offline-ocr_0.1.0_x64_en-US.msi"
                  className="whitespace-nowrap px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2"
                >
                  💻 {t.downloadWindowsCTA}
                </a>
              </div>
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

        {/* Pricing Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              🏷️ {t.pricingTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              {t.pricingSubtitle}
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {t.pricingToggleMonthly}
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                  billingPeriod === 'yearly'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {t.pricingToggleYearly}
                <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">{t.pricingYearlySave}</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {/* Free Tier */}
            <div className="bg-white dark:bg-slate-700 rounded-2xl border-2 border-slate-100 dark:border-slate-600 p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.pricingFreeTitle}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t.pricingFreeDesc}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{t.pricingFreePrice}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/ {t.pricingFreePeriod}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[t.pricingFreeFeature1, t.pricingFreeFeature2, t.pricingFreeFeature3, t.pricingFreeFeature4, t.pricingFreeFeature5].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-green-500 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 px-6 rounded-xl font-semibold bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 cursor-not-allowed">
                {language === 'zh' ? '当前已拥有' : 'Included by Default'}
              </button>
            </div>

            {/* Plus Tier */}
            <div className="bg-white dark:bg-slate-700 rounded-2xl border-2 border-slate-200 dark:border-slate-500 p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between relative transform hover:scale-[1.01]">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.pricingPlusTitle}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t.pricingPlusDesc}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">{billingPeriod === 'yearly' ? t.pricingPlusYearlyPrice : t.pricingPlusPrice}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/ {billingPeriod === 'yearly' ? t.pricingPlusYearlyPeriod : t.pricingPlusPeriod}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[t.pricingPlusFeature1, t.pricingPlusFeature2, t.pricingPlusFeature3, t.pricingPlusFeature4, t.pricingPlusFeature5].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500 font-bold font-mono">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleWebSubscribe(billingPeriod === 'yearly' ? 'plus-yearly' : 'plus-monthly')}
                  disabled={checkoutLoading}
                  className={`w-full text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transition-all active:scale-[0.98] ${checkoutLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {checkoutLoading ? '⏳...' : t.payWebSubscribe}
                </button>
                <a
                  href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 px-6 rounded-xl font-medium border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] text-sm"
                >
                  {t.payAppGooglePlay}
                </a>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="bg-white dark:bg-slate-700 rounded-2xl border-2 border-purple-500 dark:border-purple-400 p-8 shadow-md relative flex flex-col justify-between transform hover:scale-[1.02] transition-all">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {language === 'zh' ? '推荐' : 'Popular'}
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.pricingProTitle}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t.pricingProDesc}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">{billingPeriod === 'yearly' ? t.pricingProYearlyPrice : t.pricingProPrice}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/ {billingPeriod === 'yearly' ? t.pricingProYearlyPeriod : t.pricingProPeriod}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[t.pricingProFeature1, t.pricingProFeature2, t.pricingProFeature3, t.pricingProFeature4, t.pricingProFeature5].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-purple-600 dark:text-purple-400 font-bold font-mono">★</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleWebSubscribe(billingPeriod === 'yearly' ? 'pro-yearly' : 'pro-monthly')}
                  disabled={checkoutLoading}
                  className={`w-full text-center py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:shadow-lg transition-all active:scale-[0.98] ${checkoutLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {checkoutLoading ? '⏳...' : t.payWebSubscribe}
                </button>
                <a
                  href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 px-6 rounded-xl font-medium border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] text-sm"
                >
                  {t.payAppGooglePlay}
                </a>
              </div>
            </div>
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
            <a
              href="https://github.com/lingyunzheng/offline-ocr/releases/download/v0.1.0/offline-ocr_0.1.0_x64_en-US.msi"
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
            >
              💻 {t.downloadWindowsCTA}
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
            <a href="/refund" className="hover:text-purple-600 transition">
              Refund Policy
            </a>
            <a href="/contact" className="hover:text-purple-600 transition">
              Contact
            </a>
          </div>
          
          {/* Web Store MoR Disclaimer */}
          <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 max-w-2xl mx-auto leading-relaxed border-t border-gray-100 dark:border-slate-700/50 pt-4">
            Our order process is conducted by our online reseller{' '}
            <a href="https://creem.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 dark:hover:text-gray-300">Creem</a>.
            Creem is the Merchant of Record for all our orders and handles customer service inquiries and returns.
          </p>
        </div>
      </footer>

      {/* Toast Alert for Sandbox/Compliance Testing */}
      {checkoutError && (
        <div className="fixed top-6 right-6 z-[9999] max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-red-200 dark:border-red-800/50 p-5 rounded-2xl shadow-xl animate-fade-in flex items-start gap-4 transition-all duration-300">
          <div className="text-2xl mt-0.5">⚠️</div>
          <div>
            <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
              {language === 'zh' ? '创建支付链接失败' : 'Checkout Error'}
            </h5>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.checkoutErrorMsg}
            </p>
          </div>
          <button 
            onClick={() => setCheckoutError(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-bold font-mono ml-auto"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}


