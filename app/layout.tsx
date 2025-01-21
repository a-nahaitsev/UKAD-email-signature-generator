import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "UKAD Email Signature Generator",
  description: "UKAD Email Signature Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container min-h-screen h-full w-full mx-auto p-4">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
