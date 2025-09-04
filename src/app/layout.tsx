import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "../components/global/AppShell";


export const metadata: Metadata = {
  title: "BitSec Admin Dashboard",
  description: "A clean, modern user management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
