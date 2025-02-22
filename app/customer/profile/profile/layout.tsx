import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Profile | BCON",
  description: "Your BCON account, start transacting",
};

export default function BeneficiariesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
