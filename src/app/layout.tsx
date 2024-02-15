import type { Metadata } from "next";

import "./globals.css";

import {robotoCondensed} from '../../public/fonts/fonts';

export const metadata: Metadata = {
  title: "Movies",
  description: "Application to browse through a movies catalog"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.className} antialiased`}>{children}</body>
    </html>
  );
}
