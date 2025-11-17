import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Idea Wall",
  description: "快速收集、整理、刪除創意想法的最小可行產品"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`bg-slate-50 text-slate-900 ${inter.className}`}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}

