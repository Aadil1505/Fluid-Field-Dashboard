import DotBackground from "@/components/global/dot-background";
import Navbar from "@/components/global/navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://motiondesk.app"),
  title: {
    default: "MotionDesk - Live Wallpapers for macOS",
    template: "%s | MotionDesk",
  },
  description:
    "MotionDesk is a GPU-accelerated live wallpaper app for macOS with interactive themes, multi-display support, autopilot mode, and deep customization.",
  applicationName: "MotionDesk",
  creator: "MotionDesk",
  publisher: "MotionDesk",
  category: "software",
  keywords: [
    "MotionDesk",
    "MotionDesk app",
    "motion desk",
    "motion desk app",
    "macOS live wallpapers",
    "live wallpaper mac",
    "animated wallpaper macOS",
    "interactive wallpaper macOS",
    "GPU wallpaper engine macOS",
    "multi display wallpaper mac",
    "MotionDesk download",
    "moton desk",
    "motionsdesk",
    "motion deskk",
  ],
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://motiondesk.app",
    siteName: "MotionDesk",
    title: "MotionDesk - Live Wallpapers for macOS",
    description:
      "GPU-accelerated live wallpapers for macOS with interactive themes, autopilot mode, and multi-display support.",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "MotionDesk app icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MotionDesk - Live Wallpapers for macOS",
    description:
      "Interactive, GPU-accelerated live wallpapers for macOS. Multi-display ready.",
    images: ["/web-app-manifest-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={`${robotoMono.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
