"use client";

import React from "react";
import HomeIcon from "./icons/HomeIcon";
import Box from "./bits/Box";
import BeneficiariesIcon from "./icons/BeneficiariesIcon";
import HistoryIcon from "./icons/HistoryIcon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";

const MenuBar = () => {
  const side1 = [
    { name: "Home", route: "/customer/dashboard", Icon: HomeIcon },
    {
      name: "Beneficiaries",
      route: "/customer/beneficiaries",
      Icon: BeneficiariesIcon,
    },
  ];

  const side2 = [
    { name: "History", route: "/customer/histories", Icon: HistoryIcon },
    {
      name: "Profile",
      route: "/customer/profile",
      image: () => (
        <Image src="/icons/profile.png" width={24} height={24} alt="profile" />
      ),
    },
  ];

  const pathname = usePathname();

  const excludeRoutes = ["/customer/send-money"];

  return excludeRoutes.includes(pathname) ? (
    ""
  ) : (
    <>
      <div className="h-[110px]"></div>
      <Box className="mb-0 rounded-b-none grid grid-cols-6 gap-4 text-[12px] fixed bottom-0 left-1/2 transform -translate-x-1/2  w-full max-w-[400px]">
        <Link
          href="/send-money"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[40%]"
        >
          <Image
            className="rounded-full cursor-pointer p-4 w-[100px] bg-neutral"
            src="/icons/send-circle.svg"
            width={244}
            height={244}
            alt="send"
          />
        </Link>
        {side1.map((item) => {
          return (
            <Link
              href={item.route}
              className="flex items-center flex-col col-span-1"
            >
              <item.Icon active={pathname === item.route} />
              <div
                className={cn(
                  `${pathname === item.route && "text-primary-orange"}`
                )}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
        <div className="col-span-2"></div>
        {side2.map((item) => {
          return (
            <Link
              href={item.route}
              className="flex items-center flex-col col-span-1"
            >
              {item.Icon ? (
                <item.Icon active={pathname === item.route} />
              ) : (
                <item.image />
              )}
              <div
                className={cn(
                  `${pathname === item.route && "text-primary-orange"}`
                )}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
      </Box>
    </>
  );
};

export default MenuBar;
