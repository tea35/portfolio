import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextIntlClientProvider>
      <Header />
      {children}
      <Analytics />
      <Footer />
    </NextIntlClientProvider>
  );
}
