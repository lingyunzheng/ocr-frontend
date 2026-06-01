'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
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
    subtitle: 'Convert images, formulas, and complex documents into editable text.',
    heroKicker: 'Private OCR workspace for serious documents',
    heroBody:
      'Keep the subscription path front and center while showing the real product: phone, tablet, Windows editor, formula recognition, and export workflows in one polished landing experience.',
    heroPrimaryCTA: 'Subscribe on Web',
    heroSecondaryCTA: 'Try OCR Demo',
    navShowcase: 'Showcase',
    navDemo: 'Demo',
    navPricing: 'Pricing',
    navDownload: 'Download',
    statLocal: 'Local mode',
    statFormula: 'Formula OCR',
    statExport: 'Word/PDF export',
    visualTitle: 'Live recognition workflow',
    visualSubtitle: 'From capture to editable output',
    demoNotice:
      'This web page is an online demo for basic text recognition. For full dual-engine capabilities, subscribe on web or download the app.',
    downloadAppCTA: 'Download App',
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
    features: 'Built for documents that need precision',
    feature1: 'Instant Recognition',
    feature1Desc: 'Process images quickly with a clean capture-to-text flow.',
    feature2: 'Privacy First',
    feature2Desc: 'On-device mode processes files locally with zero server upload.',
    feature3: 'Dual-Engine Architecture',
    feature3Desc: 'Use free local AI models, or opt into cloud mode for higher accuracy.',
    feature4: 'Multiple Languages',
    feature4Desc: 'Support for multiple languages, formulas, and structured layouts.',
    showcaseTitle: 'More proof, less clutter',
    showcaseSubtitle:
      'The page now uses your strongest assets as a compact gallery instead of heavy stacked sections.',
    showcasePhone: 'Mobile formula capture',
    showcasePhoneDesc: 'A premium first impression for students and researchers.',
    showcaseWindows: 'Windows editor',
    showcaseWindowsDesc: 'Desktop document editing and math-heavy recognition.',
    showcaseExport: 'Word-ready output',
    showcaseExportDesc: 'Show the result users can immediately copy, export, or edit.',
    demoTitle: 'Online OCR demo',
    demoSubtitle:
      'Keep the web demo available for trust, but let subscription remain the primary conversion path.',
    uploadTitle: 'Upload an image',
    uploadHint: 'PNG, JPG, GIF up to 50MB',
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
    included: 'Included by Default',
    popular: 'Popular',
    checkoutErrorMsg: 'Failed to create checkout. Please try again later.',
    downloadApp: 'Download Apps',
    appBenefit: 'Get full offline processing, formula parsing, and export workflows on your devices.',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    selectedFile: 'Selected file',
    imageSize: 'Image size',
    footer: '© 2026 Offline OCR. All rights reserved.',
    affiliate: 'Partner with Us (Earn 30%)',
  },
  zh: {
    title: 'Offline OCR：数学公式与文字识别',
    subtitle: '把图片、公式和复杂文档一键转换为可编辑文本。',
    heroKicker: '为严肃文档打造的私密 OCR 工作台',
    heroBody:
      '首页继续突出网页订阅，同时把真实产品能力展示出来：手机、平板、Windows 编辑器、公式识别和导出流程，都放在一个更克制高级的视觉里。',
    heroPrimaryCTA: '网页端订阅',
    heroSecondaryCTA: '体验 OCR 演示',
    navShowcase: '展示',
    navDemo: '演示',
    navPricing: '订阅',
    navDownload: '下载',
    statLocal: '本地模式',
    statFormula: '公式识别',
    statExport: 'Word/PDF 导出',
    visualTitle: '实时识别流程',
    visualSubtitle: '从拍照到可编辑输出',
    demoNotice:
      '此网页为基础文字识别在线演示。完整双引擎能力、高精度公式解析和无广告体验，可通过网页订阅或下载 App 获得。',
    downloadAppCTA: '下载 App',
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
    features: '为高精度文档而设计',
    feature1: '极速识别',
    feature1Desc: '从图片到文本的流程更快、更清爽。',
    feature2: '隐私保护',
    feature2Desc: '默认本地模式下所有数据在设备端完成处理，零上传。',
    feature3: '双引擎架构',
    feature3Desc: '日常可用免费本地 AI，也可选择云端模式获得更高精度。',
    feature4: '多语言支持',
    feature4Desc: '支持多语言、数学公式和复杂版面。',
    showcaseTitle: '更多展示，但不臃肿',
    showcaseSubtitle:
      '我把素材整理成紧凑画廊，用真实界面证明能力，而不是堆很多大段卡片。',
    showcasePhone: '移动端公式捕捉',
    showcasePhoneDesc: '适合学生、研究者第一眼感知产品价值。',
    showcaseWindows: 'Windows 编辑器',
    showcaseWindowsDesc: '展示桌面端文档编辑和数学识别能力。',
    showcaseExport: 'Word 输出结果',
    showcaseExportDesc: '突出用户最终能复制、导出和继续编辑。',
    demoTitle: '在线 OCR 演示',
    demoSubtitle: '保留网页演示建立信任，同时让订阅仍然是主要转化路径。',
    uploadTitle: '上传图片',
    uploadHint: 'PNG、JPG、GIF，最大 50MB',
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
    included: '当前已拥有',
    popular: '推荐',
    checkoutErrorMsg: '创建支付链接失败，请稍后再试！',
    downloadApp: '下载客户端',
    appBenefit: '在设备上获得完整离线处理、公式解析和导出流程。',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    selectedFile: '已选文件',
    imageSize: '图片大小',
    footer: '© 2026 Offline OCR。保留所有权利。',
    affiliate: '加入分销计划 (赚取 30% 佣金)',
  },
};

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [result, setResult] = useState<{ text: string; lines: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [showDetails, setShowDetails] = useState(false);
  const [fileSize, setFileSize] = useState('');
  const [checkoutError, setCheckoutError] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ssoToken = urlParams.get('sso_token');

      if (ssoToken) {
        try {
          const decoded = jwtDecode<any>(ssoToken);
          const profile: UserProfile = {
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
          };
          setUserProfile(profile);
          saveAuthToken(ssoToken);
          saveAuthProfile(profile);
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {
          console.error('Invalid SSO token:', e);
        }
      } else {
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
              picture: savedProfile?.picture || decoded.picture,
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
        console.error('Failed to sign in', e);
        clearAuthStorage();
      }
    },
    onError: (errorResponse) => console.error(errorResponse),
  });

  const handleLogout = () => {
    setUserProfile(null);
    clearAuthStorage();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const showcaseCards = [
    {
      title: t.showcasePhone,
      desc: t.showcasePhoneDesc,
      src: '/showcase/phone-formula.png',
      alt: 'Phone formula recognition screen',
    },
    {
      title: t.showcaseWindows,
      desc: t.showcaseWindowsDesc,
      src: '/showcase/windows-editor.png',
      alt: 'Windows OCR editor screen',
    },
    {
      title: t.showcaseExport,
      desc: t.showcaseExportDesc,
      src: '/showcase/word-output.png',
      alt: 'Word output from OCR',
    },
  ];

  const featureCards = [
    { title: t.feature1, desc: t.feature1Desc, accent: 'bg-cyan-500' },
    { title: t.feature2, desc: t.feature2Desc, accent: 'bg-emerald-500' },
    { title: t.feature3, desc: t.feature3Desc, accent: 'bg-violet-500' },
    { title: t.feature4, desc: t.feature4Desc, accent: 'bg-amber-500' },
  ];

  const pricingPlans = [
    {
      id: 'free',
      name: t.pricingFreeTitle,
      price: t.pricingFreePrice,
      period: t.pricingFreePeriod,
      desc: t.pricingFreeDesc,
      features: [
        t.pricingFreeFeature1,
        t.pricingFreeFeature2,
        t.pricingFreeFeature3,
        t.pricingFreeFeature4,
        t.pricingFreeFeature5,
      ],
      tone: 'neutral',
    },
    {
      id: 'plus',
      name: t.pricingPlusTitle,
      price: billingPeriod === 'yearly' ? t.pricingPlusYearlyPrice : t.pricingPlusPrice,
      period: billingPeriod === 'yearly' ? t.pricingPlusYearlyPeriod : t.pricingPlusPeriod,
      desc: t.pricingPlusDesc,
      features: [
        t.pricingPlusFeature1,
        t.pricingPlusFeature2,
        t.pricingPlusFeature3,
        t.pricingPlusFeature4,
        t.pricingPlusFeature5,
      ],
      checkoutPlan: billingPeriod === 'yearly' ? 'plus-yearly' : 'plus-monthly',
      tone: 'plus',
    },
    {
      id: 'pro',
      name: t.pricingProTitle,
      price: billingPeriod === 'yearly' ? t.pricingProYearlyPrice : t.pricingProPrice,
      period: billingPeriod === 'yearly' ? t.pricingProYearlyPeriod : t.pricingProPeriod,
      desc: t.pricingProDesc,
      features: [
        t.pricingProFeature1,
        t.pricingProFeature2,
        t.pricingProFeature3,
        t.pricingProFeature4,
        t.pricingProFeature5,
      ],
      checkoutPlan: billingPeriod === 'yearly' ? 'pro-yearly' : 'pro-monthly',
      tone: 'pro',
    },
  ];

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
          Authorization: `Bearer ${token}`,
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

  const compressImageToJPG = (inputFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(inputFile);
      reader.onload = (e) => {
        const img = new window.Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

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

          canvas.toBlob(
            (blob) => {
              if (blob) {
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
            0.8
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileSelect = async (selectedFile: File) => {
    setError('');
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);

    setFileSize(formatFileSize(selectedFile.size));
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
      dragRef.current.style.backgroundColor = 'rgba(8, 145, 178, 0.08)';
      dragRef.current.style.borderColor = '#0891b2';
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragRef.current) {
      dragRef.current.style.backgroundColor = 'transparent';
      dragRef.current.style.borderColor = '#cbd5e1';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragRef.current) {
      dragRef.current.style.backgroundColor = 'transparent';
      dragRef.current.style.borderColor = '#cbd5e1';
    }
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
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
      const textFile = new Blob([result.text], { type: 'text/plain' });
      element.href = URL.createObjectURL(textFile);
      element.download = `offline-ocr-result-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f4] text-slate-950 dark:bg-[#0f1115] dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#11141a]/85">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white shadow-sm dark:bg-white dark:text-slate-950">
              OCR
            </span>
            <span>
              <span className="block text-base font-bold">Offline OCR</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                Math & Word Recognition
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 text-sm font-medium text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300 lg:flex">
            <a href="#showcase" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white">
              {t.navShowcase}
            </a>
            <a href="#demo" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white">
              {t.navDemo}
            </a>
            <a href="#pricing" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white">
              {t.navPricing}
            </a>
            <a href="#download" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white">
              {t.navDownload}
            </a>
          </nav>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {userProfile ? (
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm shadow-sm dark:border-white/10 dark:bg-white/5">
                {userProfile.picture ? (
                  <img src={userProfile.picture} alt="Avatar" className="h-7 w-7 rounded-full" />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">
                    {userProfile.name?.charAt(0) || userProfile.email?.charAt(0)}
                  </div>
                )}
                <span className="max-w-[120px] truncate font-medium">
                  {userProfile.name || userProfile.email.split('@')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-md px-2 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  title="Sign Out"
                >
                  X
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginWithGoogle()}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                {language === 'zh' ? '登录' : 'Sign In'}
              </button>
            )}

            <div className="flex rounded-lg border border-slate-200 bg-white p-1 text-sm font-semibold shadow-sm dark:border-white/10 dark:bg-white/5">
              <button
                onClick={() => setLanguage('en')}
                className={`rounded-md px-3 py-1.5 transition ${
                  language === 'en'
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('zh')}
                className={`rounded-md px-3 py-1.5 transition ${
                  language === 'zh'
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                中
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="premium-grid border-b border-slate-200/80 dark:border-white/10">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-8">
            <div className="animate-reveal-up">
              <p className="mb-4 inline-flex rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-200">
                {t.heroKicker}
              </p>
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-slate-950 dark:text-white md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t.subtitle}
              </p>
              <p className="mt-4 hidden max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:block">
                {t.heroBody}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#pricing"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  {t.heroPrimaryCTA}
                </a>
                <a
                  href="#demo"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-700 active:translate-y-0 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-cyan-300"
                >
                  {t.heroSecondaryCTA}
                </a>
              </div>

              <div className="mt-10 hidden max-w-2xl grid-cols-3 gap-3 sm:grid">
                {[t.statLocal, t.statFormula, t.statExport].map((item, idx) => (
                  <div
                    key={item}
                    className="rounded-lg border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="text-2xl font-black text-slate-950 dark:text-white">
                      {idx === 0 ? '100%' : idx === 1 ? 'AI' : '.docx'}
                    </div>
                    <div className="mt-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[395px] animate-reveal-up-delay md:min-h-[560px]">
              <div className="media-sheen absolute left-1/2 top-0 w-[94%] -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 dark:border-white/10 dark:bg-[#171b22] md:top-5">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/10">
                  <div>
                    <p className="text-sm font-bold">{t.visualTitle}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.visualSubtitle}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                    Live
                  </span>
                </div>
                <video
                  className="aspect-video w-full bg-slate-900 object-cover"
                  src="/showcase/ocr-workflow.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/showcase/recognizing.png"
                />
                <div className="grid grid-cols-3 border-t border-slate-200 text-center text-xs font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <span className="px-3 py-3">Capture</span>
                  <span className="border-x border-slate-200 px-3 py-3 dark:border-white/10">Recognize</span>
                  <span className="px-3 py-3">Export</span>
                </div>
              </div>

              <div className="absolute bottom-8 left-0 hidden w-56 animate-float-slow overflow-hidden rounded-lg border border-white bg-white shadow-xl shadow-slate-900/15 md:block">
                <Image
                  src="/showcase/phone-formula.png"
                  alt="Mobile formula OCR"
                  width={1920}
                  height={1080}
                  className="h-36 w-full object-cover"
                  priority
                />
                <div className="px-4 py-3 text-sm font-bold text-slate-900">
                  {t.statFormula}
                </div>
              </div>

              <div className="absolute bottom-0 right-2 hidden w-64 animate-float-slower overflow-hidden rounded-lg border border-white bg-white shadow-xl shadow-slate-900/15 md:block">
                <Image
                  src="/showcase/windows-editor.png"
                  alt="Windows OCR editor"
                  width={3840}
                  height={2037}
                  className="h-32 w-full object-cover"
                  priority
                />
                <div className="px-4 py-3 text-sm font-bold text-slate-900">
                  Windows + Export
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-b border-slate-200 bg-[#eef2ed] px-4 py-16 dark:border-white/10 dark:bg-[#12161d] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase text-cyan-700 dark:text-cyan-300">
                {t.navPricing}
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white md:text-4xl">
                {t.pricingTitle}
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                {t.pricingSubtitle}
              </p>
              <div className="mt-7 inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`rounded-md px-5 py-2 text-sm font-bold transition ${
                    billingPeriod === 'monthly'
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {t.pricingToggleMonthly}
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`rounded-md px-5 py-2 text-sm font-bold transition ${
                    billingPeriod === 'yearly'
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {t.pricingToggleYearly} · {t.pricingYearlySave}
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {pricingPlans.map((plan) => {
                const isPro = plan.id === 'pro';
                const isPlus = plan.id === 'plus';
                return (
                  <div
                    key={plan.id}
                    className={`relative flex min-h-[560px] flex-col rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-white/[0.04] ${
                      isPro
                        ? 'border-slate-950 ring-2 ring-slate-950/10 dark:border-cyan-300 dark:ring-cyan-300/20'
                        : 'border-slate-200 dark:border-white/10'
                    }`}
                  >
                    {isPro && (
                      <span className="absolute right-5 top-5 rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase text-amber-800 dark:bg-amber-300/15 dark:text-amber-200">
                        {t.popular}
                      </span>
                    )}
                    <div>
                      <h3 className="pr-20 text-xl font-black text-slate-950 dark:text-white">
                        {plan.name}
                      </h3>
                      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {plan.desc}
                      </p>
                      <div className="mt-6 flex items-end gap-2">
                        <span className={`text-4xl font-black ${isPlus ? 'text-cyan-700 dark:text-cyan-300' : isPro ? 'text-violet-700 dark:text-violet-300' : 'text-slate-950 dark:text-white'}`}>
                          {plan.price}
                        </span>
                        <span className="pb-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                          / {plan.period}
                        </span>
                      </div>
                      <ul className="mt-7 space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                            <span className={`mt-1.5 h-2 w-2 rounded-full ${isPro ? 'bg-violet-500' : isPlus ? 'bg-cyan-500' : 'bg-emerald-500'}`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8">
                      {plan.id === 'free' ? (
                        <button className="w-full rounded-lg bg-slate-100 px-5 py-3 text-sm font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300" disabled>
                          {t.included}
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <button
                            onClick={() => handleWebSubscribe(plan.checkoutPlan || '')}
                            disabled={checkoutLoading}
                            className={`w-full rounded-lg px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${
                              isPro
                                ? 'bg-slate-950 shadow-slate-900/20 hover:bg-slate-800 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-300'
                                : 'bg-cyan-700 shadow-cyan-900/20 hover:bg-cyan-600'
                            }`}
                          >
                            {checkoutLoading ? '...' : t.payWebSubscribe}
                          </button>
                          <a
                            href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full rounded-lg border border-slate-200 px-5 py-2.5 text-center text-sm font-bold text-slate-600 transition hover:border-slate-400 hover:text-slate-950 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
                          >
                            {t.payAppGooglePlay}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="showcase" className="border-b border-slate-200 bg-white px-4 py-16 dark:border-white/10 dark:bg-[#0f1115] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase text-cyan-700 dark:text-cyan-300">
                  {t.navShowcase}
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white md:text-4xl">
                  {t.showcaseTitle}
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                  {t.showcaseSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {featureCards.map((feature) => (
                  <div key={feature.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <span className={`mb-4 block h-1 w-10 rounded-full ${feature.accent}`} />
                    <h3 className="text-sm font-black text-slate-950 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {showcaseCards.map((card, idx) => (
                <article
                  key={card.title}
                  className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      width={idx === 1 ? 3840 : 1920}
                      height={idx === 1 ? 2037 : 1080}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-black text-slate-950 dark:text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{card.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="border-b border-slate-200 bg-[#f7f8f4] px-4 py-16 dark:border-white/10 dark:bg-[#11141a] sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-bold uppercase text-cyan-700 dark:text-cyan-300">
                {t.navDemo}
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white md:text-4xl">
                {t.demoTitle}
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                {t.demoSubtitle}
              </p>
              <div className="mt-6 rounded-lg border border-cyan-200 bg-cyan-50 p-5 text-sm leading-7 text-cyan-900 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100">
                {t.demoNotice}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-900/15 transition hover:-translate-y-0.5 hover:bg-cyan-600"
                >
                  {t.downloadAppCTA}
                </a>
                <a
                  href="https://github.com/lingyunzheng/offline-ocr/releases/download/v0.1.0/offline-ocr_0.1.0_x64_en-US.msi"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
                >
                  {t.downloadWindowsCTA}
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">{t.uploadTitle}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.uploadHint}</p>
                </div>
                <a
                  href="#pricing"
                  className="hidden rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 sm:inline-flex"
                >
                  {t.heroPrimaryCTA}
                </a>
              </div>

              <div
                ref={dragRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="cursor-pointer rounded-lg border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-cyan-500 hover:bg-cyan-50/70 dark:border-white/15 dark:hover:bg-cyan-300/10"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-2xl dark:bg-white/10">
                  OCR
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {t.dragDrop} <span className="font-bold text-cyan-700 dark:text-cyan-300">{t.browse}</span>
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {t.uploadHint}
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

              {preview && (
                <div className="mt-5 overflow-hidden rounded-lg border border-cyan-200 bg-slate-100 dark:border-cyan-400/30 dark:bg-slate-900">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-96 w-full object-contain"
                  />
                </div>
              )}

              {file && (
                <div className="mt-5 flex items-center justify-between gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-300/20 dark:bg-emerald-300/10">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-950 dark:text-white">{t.selectedFile}:</p>
                    <p className="truncate text-sm text-slate-600 dark:text-slate-300">{file.name}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {t.imageSize}: {fileSize}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview('');
                      setResult(null);
                      setError('');
                      setFileSize('');
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-black text-slate-500 transition hover:bg-white hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label="Clear selected file"
                  >
                    X
                  </button>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={loading}
                className={`mt-5 w-full rounded-lg px-6 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${
                  loading
                    ? 'bg-slate-400 shadow-none'
                    : 'bg-slate-950 shadow-slate-900/20 hover:bg-slate-800 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-300'
                }`}
              >
                {loading ? t.recognizing : t.startRecognition}
              </button>

              {error && (
                <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-100">
                  {error}
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                {t.results}
              </h3>
              <div className="mt-5 max-h-72 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-200">
                  {result.text || t.noText}
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <button
                  onClick={copyToClipboard}
                  className="rounded-lg bg-cyan-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-600"
                >
                  {t.copy}
                </button>
                <button
                  onClick={downloadAsText}
                  className="rounded-lg bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                >
                  {t.download}
                </button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950"
                >
                  {showDetails ? 'Hide' : 'Show'} {t.viewDetails}
                </button>
              </div>

              {showDetails && result.lines.length > 0 && (
                <div className="mt-6 border-t border-slate-200 pt-6 dark:border-white/10">
                  <h4 className="font-black text-slate-950 dark:text-white">
                    Line-by-line Breakdown ({result.lines.length} lines)
                  </h4>
                  <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">
                    {result.lines.map((line, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border-l-4 border-cyan-600 bg-slate-50 p-3 text-sm dark:bg-white/5"
                      >
                        <span className="font-bold text-cyan-700 dark:text-cyan-300">
                          Line {idx + 1}:
                        </span>{' '}
                        <span className="text-slate-700 dark:text-slate-300">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <section id="download" className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase text-cyan-300">
                {t.navDownload}
              </p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                {t.downloadApp}
              </h2>
              <p className="mt-4 max-w-xl text-slate-300">
                {t.appBenefit}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
                >
                  {t.googlePlay}
                </a>
                <a
                  href="https://github.com/lingyunzheng/offline-ocr/releases/download/v0.1.0/offline-ocr_0.1.0_x64_en-US.msi"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-100"
                >
                  {t.downloadWindowsCTA}
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
              <Image
                src="/showcase/tablet-formula.png"
                alt="Tablet formula recognition showcase"
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 dark:border-white/10 dark:bg-[#0f1115]">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>{t.footer}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a href="/privacy" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">
              Privacy Policy
            </a>
            <a href="/terms" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">
              Terms of Service
            </a>
            <a href="/refund" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">
              Refund Policy
            </a>
            <a href="/contact" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">
              Contact
            </a>
            <a
              href="https://affiliates.creem.io/join/offline-ocr"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1 font-bold text-cyan-700 transition hover:border-cyan-400 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200"
            >
              {t.affiliate}
            </a>
          </div>

          <p className="mx-auto mt-6 max-w-2xl border-t border-slate-100 pt-4 text-xs leading-6 text-slate-400 dark:border-white/10 dark:text-slate-500">
            Our order process is conducted by our online reseller{' '}
            <a href="https://creem.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700 dark:hover:text-slate-300">
              Creem
            </a>
            . Creem is the Merchant of Record for all our orders and handles customer service inquiries and returns.
          </p>
        </div>
      </footer>

      {checkoutError && (
        <div className="fixed right-4 top-5 z-[9999] max-w-sm rounded-lg border border-rose-200 bg-white p-5 shadow-xl shadow-slate-900/15 animate-reveal-up dark:border-rose-400/30 dark:bg-[#171b22]">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
            <div className="min-w-0">
              <h5 className="font-black text-slate-950 dark:text-white">
                {language === 'zh' ? '创建支付链接失败' : 'Checkout Error'}
              </h5>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t.checkoutErrorMsg}
              </p>
            </div>
            <button
              onClick={() => setCheckoutError(false)}
              className="ml-auto rounded-md px-2 py-1 text-xs font-black text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
