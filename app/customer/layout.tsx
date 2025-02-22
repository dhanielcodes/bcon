import "@/app/globals.css";
import Box from "@/components/bits/Box";
import MenuBar from "@/components/MenuBar";
import Topbar from "@/components/Topbar";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard | BCON",
  description: "Your BCON account, start transacting",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <MenuBar />
    </div>
  );
}
