import { RateSelectType } from "@/types/types";
import Image from "next/image";
import React, { lazy, useState } from "react";
const RateInput = lazy(() => import("@/components/RateInput"));

const ConversionRateInput = ({
  onChange,
  value = {
    fromCurrency: {
      amount: 0,
      currency: "",
      id: "",
    },
    toCurrency: {
      amount: 0,
      currency: "",
      id: "",
    },
  },
}: {
  onChange: (arg0: any) => void;
  value?: {
    fromCurrency: RateSelectType;
    toCurrency: RateSelectType;
  };
}) => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const inputValue = value;
  return (
    <div className="space-y-4">
      <RateInput
        value={inputValue.fromCurrency}
        onChange={(e) => {
          setFrom(e);
          if (onChange)
            onChange({
              fromCurrency: e,
              toCurrency: to,
            });
        }}
      />
      <div className="flex justify-between space-x-4">
        <div className="flex w-full items-center justify-between text-sm">
          <div className="text-left space-y-4">
            <div>Rate</div>
            <div>Fee</div>
          </div>
          <div className="text-right space-y-4">
            <div>£1 = ₦1829.00</div>
            <div>FREE</div>
          </div>
        </div>
        <Image
          src="/icons/switch-icon.svg"
          alt="switch"
          width={70}
          height={70}
          className="cursor-pointer"
        />
      </div>
      <RateInput
        title="Receiver gets"
        value={inputValue.toCurrency}
        onChange={(e) => {
          setTo(e);
          if (onChange)
            onChange({
              fromCurrency: from,
              toCurrency: e,
            });
        }}
      />
    </div>
  );
};

export default ConversionRateInput;
