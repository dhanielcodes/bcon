"use client";
import React from "react";
import HomeIcon from "../icons/HomeIcon";
import BeneficiariesIcon from "../icons/BeneficiariesIcon";
import HistoryIcon from "../icons/HistoryIcon";
import Image from "next/image";
import MenuBar from "../MenuBar";

const CustomerMenuBar = () => {
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
  return (
    <MenuBar
      side1={side1}
      side2={side2}
      mainRoute={{
        img: "/icons/send-circle.svg",
        route: "/customer/send-money",
      }}
    />
  );
};

export default CustomerMenuBar;
