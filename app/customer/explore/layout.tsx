import "@/app/globals.css";
import Box from "@/components/bits/Box";
import MenuBar from "@/components/MenuBar";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Explore | BCON",
  description: "Your BCON account, start transacting",
};

export default function BeneficiariesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
