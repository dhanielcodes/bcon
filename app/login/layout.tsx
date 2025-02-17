import "@/app/globals.css";
import Box from "@/components/bits/Box";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login | BCON",
  description: "Login to your BCON account to start transacting",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Box className="rounded-t-none">
        <div className="grid place-items-center">
          <Image src="/logo.svg" width={60} height={60} alt="logo" />
        </div>
      </Box>
      {children}
    </div>
  );
}
