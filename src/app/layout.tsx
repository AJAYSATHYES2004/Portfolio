import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AJAY SATHYESH M | AI Engineer & Python Developer Portfolio",
  description: "Professional portfolio of Ajay Sathyesh M, a detail-oriented AI Engineer, Python Developer, and Machine Learning Enthusiast building intelligent enterprise solutions.",
  keywords: "AI Engineer, Python Developer, Machine Learning, Full Stack Developer, Puducherry, Cavin Infotech, IgniteLabs, Next.js, FastAPI, MySQL",
  authors: [{ name: "Ajay Sathyesh M" }],
  openGraph: {
    title: "AJAY SATHYESH M | AI Engineer & Python Developer Portfolio",
    description: "Intelligent enterprise solutions using Machine Learning, React, FastAPI, Python, and MySQL.",
    url: "https://ignitelabs.in/ajaysathyesh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} scroll-smooth dark`}
    >
      <body className="font-sans min-h-screen flex flex-col antialiased">
        <SmoothScroll>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
