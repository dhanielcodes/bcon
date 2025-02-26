import "@/app/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Send Money | BCON",
  description: "Send money, start transacting",
};

export default function SendMoneyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
