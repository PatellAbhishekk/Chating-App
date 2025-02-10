import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatting App - Anonymised Chat",
  description: "Anonymised chat. Make healthy conversations.",
  authors: { url: "https://Abhishek.phleebs.tech", name: "Abhishek Patel" },
  keywords: ["Chat Room", "Chatting App", "Anonymised chat"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased`}>{children}</body>
    </html>
  );
}
