import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "跨语实践概念百科 | Translanguaging Encyclopedia",
  description: "面向博士研究的跨语实践与应用语言学中文概念百科：600个概念，10个分析维度。",
  openGraph: { title: "跨语实践概念百科", description: "600 个概念，10 个分析维度。" },
  twitter: { card: "summary", title: "跨语实践概念百科", description: "600 个概念，10 个分析维度。" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
