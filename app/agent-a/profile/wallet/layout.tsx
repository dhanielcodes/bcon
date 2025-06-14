import "@/app/globals.css";
import Box from "@/components/bits/Box";
import MenuBar from "@/components/MenuBar";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Wallets | BCON",
  description: "Your BCON account, start transacting",
};

export default function BeneficiariesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="h-[40px]"></div>
      {children}
    </div>
  );
}
