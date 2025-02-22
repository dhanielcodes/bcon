import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History | BCON",
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
