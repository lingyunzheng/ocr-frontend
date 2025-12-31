/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用严格模式
  reactStrictMode: true,

  // 图像优化
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },

  // 压缩配置
  compress: true,

  // PoweredBy 头部移除
  poweredByHeader: false,

  // 生成 ETag
  generateEtags: true,

  // 启用 GZIP 压缩
  httpAgentOptions: {
    keepAlive: true,
  },

  // 重定向配置
  async redirects() {
    return [
      // 示例：旧页面重定向
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // 响应头配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
      // 缓存优化
      {
        source: '/public/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // 自定义 webpack 配置（可选）
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 服务端优化
    }
    return config;
  },

  // SWC 编译器优化
  swcMinify: true,

  // 国际化配置（如果使用）
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },

  // 实验性功能
  experimental: {
    // optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};

module.exports = nextConfig;
