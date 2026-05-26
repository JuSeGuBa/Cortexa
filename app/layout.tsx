import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import { SidebarWrapper } from "@/components/ui/SidebarWrapper";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { MainWrapper } from "@/components/ui/MainWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Cortexa — Intelligent Productivity",
  description: "Your second brain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${dmMono.variable}`}
        style={{
          margin: 0,
          background: "#020617",
          minHeight: "100vh",
          display: "flex",
          fontFamily: "var(--font-display), sans-serif",
          overflowX: "hidden",
        }}
      >
        <AnimatedBackground />
        <SidebarWrapper />
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}
