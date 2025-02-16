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
      <Box className="grid place-items-center rounded-t-none">
        <Image src="/logo.svg" width={60} height={60} alt="logo" />
      </Box>
      {children}
    </div>
  );
}
