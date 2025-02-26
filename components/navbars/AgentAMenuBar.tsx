"use client";
import React from "react";
import HomeIcon from "../icons/HomeIcon";
import BeneficiariesIcon from "../icons/BeneficiariesIcon";
import HistoryIcon from "../icons/HistoryIcon";
import Image from "next/image";
import MenuBar from "../MenuBar";

const AgentAMenuBar = () => {
  const side1 = [
    { name: "Home", route: "/agent-a/dashboard", Icon: HomeIcon },
    {
      name: "Customers",
      route: "/agent-a/customers",
      Icon: BeneficiariesIcon,
    },
  ];

  const side2 = [
    { name: "History", route: "/agent-a/histories", Icon: HistoryIcon },
    {
      name: "Profile",
      route: "/agent-a/profile",
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
        img: "/icons/switch-icon.svg",
        route: "/agent-a/send-money",
      }}
    />
  );
};

export default AgentAMenuBar;
