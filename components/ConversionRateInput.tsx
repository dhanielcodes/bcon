import Image from "next/image";
import React, { lazy, useState } from "react";
const RateInput = lazy(() => import("@/components/RateInput"));

type OptionType = {
  amount: number;
  currency: string;
};
const ConversionRateInput = ({
  onChange,
  value = {
    fromCurrency: {
      amount: 0,
      currency: "",
    },
    toCurrency: {
      amount: 0,
      currency: "",
    },
  },
}: {
  onChange: (arg0: any) => void;
  value?: {
    fromCurrency: OptionType;
    toCurrency: OptionType;
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
      <div className="flex justify-between space-x-2">
        <div className="flex w-full items-center justify-between text-sm">
          <div className="text-left">
            <div>Rate</div>
            <div>Fee</div>
          </div>
          <div className="text-right">
            <div>£1 = ₦1829.00</div>
            <div>FREE</div>
          </div>
        </div>
        <Image
          src="/icons/switch-icon.svg"
          alt="switch"
          width={60}
          height={60}
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
