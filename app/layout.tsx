import DotBackground from "@/components/global/dot-background";
import Navbar from "@/components/global/navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const quantico = Roboto_Mono({
  variable: "--font-quantico",
  weight: "400"
});

export const metadata: Metadata = {
  title: "MotionDesk — Live wallpapers for macOS",
  description:
    "GPU-accelerated live wallpaper engine for macOS with 10+ physics-driven themes, cursor-responsive interaction, and multi-display support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${quantico.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DotBackground />
          <div className="relative" style={{ zIndex: 1 }}>
            <Navbar />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
