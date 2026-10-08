import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Leihbar", template: "%s – Leihbar" },
  description: "Leihen statt kaufen – Dinge am Campus anbieten, finden, anfragen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
