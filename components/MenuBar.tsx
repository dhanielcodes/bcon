import React from "react";
import HomeIcon from "./icons/HomeIcon";
import Box from "./bits/Box";
import BeneficiariesIcon from "./icons/BeneficiariesIcon";
import HistoryIcon from "./icons/HistoryIcon";
import Image from "next/image";

const MenuBar = () => {
  return (
    <Box className="grid grid-cols-6 gap-4 text-[14px] relative">
      <Image
        className="rounded-full p-4 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[40%] w-[100px] bg-neutral"
        src="/icons/send-circle.svg"
        width={244}
        height={244}
        alt="send"
      />
      <div className="flex items-center flex-col col-span-1">
        <HomeIcon />
        <div>Home</div>
      </div>
      <div className="flex items-center flex-col col-span-1">
        <BeneficiariesIcon />
        <div>Beneficiaries</div>
      </div>
      <div className="col-span-2"></div>
      <div className="flex items-center  flex-col  col-span-1">
        <HistoryIcon />
        <div>History</div>
      </div>
      <div className="flex items-center flex-col col-span-1">
        <Image src="/icons/profile.png" width={24} height={24} alt="profile" />
        <div>Profile</div>
      </div>
    </Box>
  );
};

export default MenuBar;
