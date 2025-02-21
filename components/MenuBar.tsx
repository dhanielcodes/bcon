import React from "react";
import HomeIcon from "./icons/HomeIcon";
import Box from "./bits/Box";
import BeneficiariesIcon from "./icons/BeneficiariesIcon";
import HistoryIcon from "./icons/HistoryIcon";
import Image from "next/image";
import Link from "next/link";

const MenuBar = () => {
  return (
    <>
      <div className="h-[140px]"></div>
      <Box className="mb-0 rounded-b-none grid grid-cols-6 gap-4 text-[12px] fixed bottom-0 left-1/2 transform -translate-x-1/2  w-full max-w-[400px]">
        <Image
          className="rounded-full cursor-pointer p-4 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[40%] w-[100px] bg-neutral"
          src="/icons/send-circle.svg"
          width={244}
          height={244}
          alt="send"
        />
        <Link
          href="/dashboard/customer"
          className="flex items-center flex-col col-span-1"
        >
          <HomeIcon />
          <div>Home</div>
        </Link>
        <Link
          href="/dashboard/beneficiaries"
          className="flex items-center flex-col col-span-1"
        >
          <BeneficiariesIcon />
          <div>Beneficiaries</div>
        </Link>
        <div className="col-span-2"></div>
        <Link
          href="/dashboard/customer"
          className="flex items-center  flex-col  col-span-1"
        >
          <HistoryIcon />
          <div>History</div>
        </Link>
        <Link
          href="/dashboard/customer"
          className="flex items-center flex-col col-span-1"
        >
          <Image
            src="/icons/profile.png"
            width={24}
            height={24}
            alt="profile"
          />
          <div>Profile</div>
        </Link>
      </Box>
    </>
  );
};

export default MenuBar;
