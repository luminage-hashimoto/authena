import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Authena（オーセナ）— 上質な消費には、上質な情報がいる。",
    template: "%s | Authena",
  },
  description:
    "Authenaは、実際に所有し、体験し続けている者の視点から、富裕層の意志決定に必要な情報だけを届けるメディアです。Car / Watch / Travel / Beauty / Real Estate / Finance",
  keywords: ["富裕層", "ラグジュアリー", "高級車", "腕時計", "不動産", "資産運用"],
  openGraph: {
    siteName: "Authena",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${dmSans.variable} ${notoSerifJP.variable}`}
    >
      <body className="bg-base text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
