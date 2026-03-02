import type { Metadata } from "next";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "AtlasFinder",
  description: "업무 효율을 높이는 도구들과 순간을 기록하는 촬영 서비스",
  icons: {
    icon: '/logo/icon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="antialiased select-none selection:bg-coral/20 selection:text-charcoal bg-ivory text-charcoal min-h-screen flex flex-col font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
