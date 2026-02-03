
import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Serenity Maldives | Defined by Perspective",
  description: "A bespoke boutique agency crafting unrivaled journeys across the Maldivian atolls.",
  metadataBase: new URL('https://maldivesserenity.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden selection:bg-sky-100 selection:text-sky-900">
        <Navbar />
        <main>{children}</main>
        <ChatBot />
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
