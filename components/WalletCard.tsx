import { WalletCardProps } from "@/types/types";
import React, { FC, lazy, ReactNode } from "react";
import CurrencyFlagImage from "react-currency-flags";

const WalletCard: FC<WalletCardProps> = ({
  amount = "10,000",
  currency = "GBP",
  title = "Wallet Balance",
}) => {
  return (
    <div className="py-8 px-6  space-y-4 border border-primary-orange bg-neutral2 overflow-hidden relative rounded-3xl mb-4">
      <div className="text-sm">{title}</div>
      <h1 className="text-2xl font-bold">
        <span className="text-lg">£</span> 1,063.02
      </h1>
      <CurrencyFlagImage
        currency={currency}
        className="rounded-full mr-1 absolute -bottom-5 -right-5"
        style={{ width: "80px", height: "80px" }}
      />
    </div>
  );
};

export default WalletCard;
