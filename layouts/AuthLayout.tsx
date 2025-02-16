import "@/app/globals.css";
import Box from "@/components/bits/Box";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"auth-body"}>
      <Box className="rounded-t-none">
        <div className="center-logo">
          <Image src="/logo.svg" width={60} height={60} alt="logo" />
        </div>
      </Box>
      {children}
    </div>
  );
}
