import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const runtime = "edge";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shadcn-Configurator",
  description:
    "Generate shadcn/ui variables on the fly! A web application for dynamic exploration and visualization of shadcn/ui's tailwind variables.",
  openGraph: {
    title: "Shadcn-Configurator",
    description:
      "Generate shadcn/ui variables on the fly! A web application for dynamic exploration and visualization of shadcn/ui's tailwind variables.",
    url: "https://shadcn-config.com",
    siteName: "Shadcn Configurator",
    images: "https://warlockja.com/images/shadcn-config.webp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn-Configurator",
    description:
      "Generate shadcn/ui variables on the fly! A web application for dynamic exploration and visualization of shadcn/ui's tailwind variables.",
    images: "https://warlockja.com/images/shadcn-config.webp",
    site: "@RomanStepa49093",
    creator: "@RomanStepa49093",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
