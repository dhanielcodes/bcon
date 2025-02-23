"use client";

import React from "react";
import Box from "./bits/Box";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathname = usePathname();
  const excludeRoutes = [
    "/customer/send-money",
    "/customer/explore",
    "/customer/profile/profile",
    "/customer/profile/wallet",
    "/customer/profile/address",
    "/customer/profile/password",
  ];

  return excludeRoutes.includes(pathname) ? (
    ""
  ) : (
    <>
      <Box className="rounded-t-none fixed top-0 left-1/2 transform -translate-x-1/2 z-10 w-[92%] max-w-[600px]">
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
      <div className="h-[100px]"></div>
    </>
  );
};

export default Topbar;
