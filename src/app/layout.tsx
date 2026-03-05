import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { Starfield } from "@/components/ui/Starfield";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Richard Echegaray | Software Engineer",
  description:
    "Personal portfolio of Richard Echegaray — Software Engineer. Timeline of milestones, projects, blog, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <Starfield />
        <SmoothScroll />
        <CursorSpotlight />
        <FloatingNav />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
