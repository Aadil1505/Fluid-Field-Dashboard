import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import DotBackground from "@/components/dot-background";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FluidField — Live wallpapers for macOS",
  description:
    "GPU-accelerated live wallpaper engine for macOS with 7 physics-driven themes, cursor-responsive interaction, and multi-display support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DotBackground />
        <div className="relative" style={{ zIndex: 1 }}>
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
