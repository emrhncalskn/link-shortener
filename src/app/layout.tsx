import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/providers/app-wrapper";
import Header from "@/components/header/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Linksy",
  description: "A link shortener app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased mx-auto flex flex-col min-h-screen bg-[#F2F2F2]`}
      >
        <AppWrapper>
          <Header />
          <main className="bg-[#F2F2F2] flex-1 flex flex-col gap-20 pt-10 px-16">
            {children}
          </main>
        </AppWrapper>
      </body>
    </html>
  );
}
