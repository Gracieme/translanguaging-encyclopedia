import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const image = `${protocol}://${host}/og.png`;
  return {
    title: "跨语实践概念百科 | Translanguaging Encyclopedia",
    description: "面向博士研究的跨语实践与应用语言学中文概念百科。",
    openGraph: { title: "跨语实践概念百科", description: "350 个概念，10 个分析维度。", images: [image] },
    twitter: { card: "summary_large_image", title: "跨语实践概念百科", description: "350 个概念，10 个分析维度。", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
