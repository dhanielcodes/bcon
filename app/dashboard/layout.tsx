import "@/app/globals.css";
import Box from "@/components/bits/Box";
import MenuBar from "@/components/MenuBar";
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
      <Box className="rounded-t-none fixed top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[390px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/icons/profile.png"
              width={40}
              height={40}
              alt="profile"
            />
            <div className="-space-y-0.5">
              <h2 className="text-[0.8rem]">Good Afternoon,</h2>
              <h1 className="text-[1rem]">Jesuloba</h1>
            </div>
          </div>
          <div>
            <Image src="/icons/bell.svg" width={40} height={40} alt="bell" />
          </div>
        </div>
      </Box>
      <div className="h-[120px]"></div>
      {children}
      <MenuBar />
    </div>
  );
}
