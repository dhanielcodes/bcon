import { cn } from "@/libs/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { FC, HTMLAttributes } from "react";
import Box from "../bits/Box";

const CollectByField = () => {
  const paymentOptions = [
    { img: "/icons/bank.svg", name: "Direct to bank" },
    { img: "/icons/pickup.svg", name: "Cash pickup" },
    { img: "/icons/wallet.svg", name: "Pay to wallet" },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-neutral3 text-sm flex space-x-1 items-center">
        How does this recipient wants to collect? <InfoCircledIcon />
      </h1>

      <div className="grid grid-cols-3 gap-2">
        {paymentOptions.map(({ img, name }) => {
          return <Card img={img} name={name} />;
        })}
      </div>
    </div>
  );
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  name: string;
  img?: string;
}
const Card: FC<CardProps> = ({ active, name, img = "", ...props }) => {
  return (
    <div
      className={cn(
        "relative border cursor-pointer bg-white px-4 py-3 space-y-2 rounded-2xl text-sm",
        active ? "border-primary-orange" : "border-neutral"
      )}
      {...props}
    >
      <Image
        alt="pdf"
        width={40}
        height={40}
        src={img}
        className="rounded-full"
      />
      <div>{name}</div>
    </div>
  );
};

export default CollectByField;
