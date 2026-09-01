import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Preloader } from "@/components/layout/Preloader";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BEKALIN | Best Clinical Logistics Integration Network",
  description: "Platform koordinasi dan distribusi logistik klinis berbasis real-time untuk optimalisasi clinical supply chain di rumah sakit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${jakarta.className} min-h-screen antialiased bg-background text-foreground dark:text-slate-50 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Preloader />
            <AuthGuard>
              {children}
            </AuthGuard>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

