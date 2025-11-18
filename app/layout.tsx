import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import FloatingWhatsApp from "@/app/components/FloatingWhatsApp";
import { Geist } from "next/font/google";
import { LanguageProvider } from "@/app/components/i18n/LanguageProvider";

const primaryFont = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"]
});
const headingsFont = Geist({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-geist"
});

// Change the title and description to your own.
export const metadata: Metadata = {
  title: "Ravono Vendor Compliance",
  description: "Enterprise-grade vendor verification and compliance made simple."
};

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html data-editor-id="app/layout.tsx:27:5" lang="en" className={`${primaryFont.className} ${headingsFont.variable}`}>
      <body data-editor-id="app/layout.tsx:31:7" className="antialiased">
        <main data-editor-id="app/layout.tsx:32:9" className="min-h-screen">
          <ThemeProvider>
            <LanguageProvider>
              <Navbar />
              {children}
              <FloatingWhatsApp />
              <Footer />
            </LanguageProvider>
          </ThemeProvider>
        </main>
        {process.env.VISUAL_EDITOR_ACTIVE === 'true' &&
        <script data-editor-id="app/layout.tsx:50:9" src="/editor.js" async />
        }
      </body>
    </html>);

}
