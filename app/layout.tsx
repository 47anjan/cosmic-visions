import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosmic View | Interactive Particle Visualizer",
  description:
    "Cosmic View is an interactive particle visualizer that transforms particles into dynamic shapes like galaxies, fractals, DNA helices, waves, and constellations using HTML Canvas.",
  keywords: [
    "particle visualizer",
    "cosmic view",
    "generative art",
    "canvas animation",
    "particle system",
    "react animation",
    "interactive visualization",
    "creative coding",
  ],
  authors: [{ name: "Joshua" }],
  creator: "Joshua",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
