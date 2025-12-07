import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/Navbar";
import AnimatedBackground from "@/app/_components/AnimatedBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hello.mgck.ink"),
  title: {
    default: "Uzair | Full Stack Developer",
    template: "%s | Uzair",
  },
  description:
    "Full stack developer specializing in web applications. Building modern, responsive solutions with React, Next.js, TypeScript, and more.",
  keywords: [
    "full stack developer",
    "web developer",
    "software engineer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "portfolio",
    "web applications",
  ],
  authors: [{ name: "Uzair" }],
  creator: "Uzair",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://hello.mgck.ink",
    siteName: "Uzair | Portfolio",
    title: "Uzair | Full Stack Developer",
    description:
      "Full stack developer specializing in web applications. Explore my projects and get in touch.",
    images: [
      {
        url: "/wand.png",
        width: 1200,
        height: 630,
        alt: "Uzair - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uzair | Full Stack Developer",
    description:
      "Full stack developer specializing in web applications. Explore my projects and get in touch.",
    images: ["/wand.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-all`}
      >
        <main className="flex min-h-screen flex-col items-center font-sans">
          <ThemeProvider attribute="class">
            <AnimatedBackground />
            <Navbar />
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
