import type { Metadata } from "next";
import { DemoClient } from "@/components/DemoClient";

export const metadata: Metadata = { title: "Component demo", robots: { index: false } };

export default function Page() {
  return <DemoClient />;
}
