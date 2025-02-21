import "@/app/globals.css";

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Register | BCON",
  description: "Register yourself get a BCON account to start transacting",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
