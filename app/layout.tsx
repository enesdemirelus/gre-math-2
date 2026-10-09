import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Shell } from "@/components/Sidebar";
import { SECTIONS } from "@/content/sections";

export const metadata: Metadata = {
  title: { default: "GRE Quant Review", template: "%s | GRE Quant Review" },
  description: "Local review site for the GRE Quantitative Reasoning section.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Shell available={Object.keys(SECTIONS)}>{children}</Shell>
      </body>
    </html>
  );
}
