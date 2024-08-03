import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "My Awesome Blog",
    template: "%s - My Awesome Blog",
  },
  description: "Come and read my awesome articles!",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
         <meta name="google-site-verification" content="rnlz7rPVFOTPGvox5ZVGWBpqLBLg5RvrSv7KpOabMnE" />
      </head>
     
    <body className={inter.className} >
      <Header />
      <main className="p-5">{children}</main>
      <Footer />
    </body>
  </html>
  );
}
