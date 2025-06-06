import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Creative Developer",
  description: "A passionate developer crafting exceptional digital experiences with modern technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
