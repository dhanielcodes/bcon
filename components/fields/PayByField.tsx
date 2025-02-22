import { cn } from "@/libs/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { FC, HTMLAttributes } from "react";
import Box from "../bits/Box";

const PayByField = () => {
  const paymentOptions = [
    { img: "/icons/bank.svg", name: "Pay with bank" },
    { img: "/icons/bank.svg", name: "Manual bank transfer" },
    { img: "/icons/card.svg", name: "Pay with card" },
    { img: "/icons/wallet.svg", name: "Pay from wallet" },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-neutral3 text-sm flex space-x-2 items-center">
        How do you want to pay? <InfoCircledIcon />
      </h1>

      <div className="grid grid-cols-2 gap-2">
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
        width={30}
        height={30}
        src={img}
        className="rounded-full"
      />
      <div>{name}</div>
    </div>
  );
};

export default PayByField;
