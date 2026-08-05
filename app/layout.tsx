import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "跨语实践概念百科 | Translanguaging Encyclopedia",
  description: "按本科基础、研究生进阶与博士研究三个层级组织的跨语实践与应用语言学中文概念百科。",
  openGraph: { title: "跨语实践概念百科", description: "从本科基础到博士研究，按学习阶段探索应用语言学概念。" },
  twitter: { card: "summary", title: "跨语实践概念百科", description: "从本科基础到博士研究，按学习阶段探索应用语言学概念。" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
