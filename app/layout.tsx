import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "从应用语言学与社会语言学拆解超语 | 双语概念百科",
  description: "以应用语言学和社会语言学基础拆解超语理论、实践与研究方法的中英双语概念百科。",
  openGraph: { title: "从应用语言学与社会语言学拆解超语", description: "先补足基础知识，再进入超语的理论争议、实践与研究方法。" },
  twitter: { card: "summary", title: "从应用语言学与社会语言学拆解超语", description: "先补足基础知识，再进入超语的理论争议、实践与研究方法。" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
