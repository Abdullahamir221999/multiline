import type { Metadata } from "next";
import {
  Archivo,
  IBM_Plex_Mono,
  Newsreader,
} from "next/font/google";
import Script from "next/script";

import DesignSwitcher from "@/components/DesignSwitcher";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

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
  title: {
    default: "Multiline | Power Engineering",
    template: "%s | Multiline",
  },
  description:
    "Premium EV charging, solar and power solutions by Multiline Engineering.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("multiline-theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${plexMono.variable} ${newsreader.variable} flex min-h-dvh flex-col antialiased`}
        suppressHydrationWarning
      >
        <Script
          id="multiline-theme-init"
          strategy="beforeInteractive"
        >
          {themeInitScript}
        </Script>
        <ThemeProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <DesignSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
