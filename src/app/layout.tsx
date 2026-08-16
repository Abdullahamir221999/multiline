import type { Metadata } from "next";
import {
  Archivo,
  IBM_Plex_Mono,
  Newsreader,
} from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import DesignSwitcher from "@/components/DesignSwitcher";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Multiline | EV Charging",
  description:
    "Premium EV charging, solar and power solutions by Multiline Engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${plexMono.variable} ${newsreader.variable}`}
      >
        <Header />

        {children}


      </body>
    </html>
  );
}