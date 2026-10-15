import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  title: { default: "Leihbar", template: "%s – Leihbar" },
  description: "Leihen statt kaufen – Dinge am Campus anbieten, finden, anfragen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${archivo.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionConfig reducedMotion="user">
          <Header />
          {children}
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
