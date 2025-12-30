import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OCR 文字识别",
  description: "上传图片，自动识别文字内容",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
