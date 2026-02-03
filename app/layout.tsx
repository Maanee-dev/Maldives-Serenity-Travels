import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Serenity Maldives | Defined by Perspective",
  description: "A bespoke boutique agency crafting unrivaled journeys across the Maldivian atolls.",
  metadataBase: new URL('https://maldivesserenity.com'),
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden selection:bg-sky-100 selection:text-sky-900 bg-[#FCFAF7]">
        <Navbar />
        <main>
          {children}
        </main>
        <ChatBot />
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}