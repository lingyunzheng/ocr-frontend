import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free OCR Text Recognition | Image to Text Converter | 免费OCR文字识别",
  description: "Convert images to text instantly with our free OCR tool. Support for multiple languages. 免费图片文字识别工具，一键提取图片中的文字内容。",
  keywords: "OCR, 文字识别, 图片转文字, OCR tool, image to text, text recognition, 免费OCR",
  authors: [{ name: "LocalAI OCR" }],
  openGraph: {
    title: "Free OCR Text Recognition | 免费OCR文字识别",
    description: "Instantly convert images to editable text. Free OCR online tool.",
    url: "https://your-domain.com",
    siteName: "LocalAI OCR",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "OCR Text Recognition Tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free OCR Text Recognition",
    description: "Convert images to text instantly",
    images: ["https://your-domain.com/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    languages: {
      "zh-CN": "https://your-domain.com/zh",
      "en-US": "https://your-domain.com/en",
    },
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  charset: "utf-8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "LocalAI OCR",
              description: "Free Online OCR Text Recognition Tool",
              url: "https://your-domain.com",
              applicationCategory: "UtilityApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "LocalAI",
              },
            }),
          }}
        />

        {/* Google Analytics (optional) */}
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');`,
          }}
        /> */}
      </head>
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {children}
      </body>
    </html>
  );
}
