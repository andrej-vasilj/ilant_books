import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/app/ui/header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ilant Book Club",
  description: "An infinite world of books available at your fingertips!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
