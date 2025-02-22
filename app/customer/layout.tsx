import "@/app/globals.css";
import MenuBar from "@/components/MenuBar";
import type { Metadata } from "next";

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
