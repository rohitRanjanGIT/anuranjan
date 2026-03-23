import type { Metadata } from "next";
import { Manrope, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import FloatingSpeedDial from "./components/FloatingSpeedDial";
import { SiteConfigProvider } from "@/components/siteconfig-context";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anuranjan Infratech | Building Excellence, Designing Dreams",
  description: "Excellence in infrastructure and construction since 1998. Building tomorrow's landmarks with precision and integrity.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={cn("font-sans", figtree.variable)}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${manrope.variable} antialiased`}
      >
        <SiteConfigProvider>
          {children}
          <FloatingSpeedDial />
        </SiteConfigProvider>
      </body>
    </html>
  );
}
