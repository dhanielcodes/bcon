import React, { FC, useEffect, useState } from "react";

type OptionType = {
  value: string | number;
  label: string;
};
import CurrencySelect from "./CurrencySelect";
import styled from "styled-components";
import getSymbolFromCurrency from "currency-symbol-map";
import { NumericFormat } from "react-number-format";

const RateInput: FC<{
  onChange?: (arg0: any) => void;
  value: {
    amount: number;
    currency: string;
  };
  title?: string;
}> = ({
  onChange,
  value = { amount: 0, currency: "" },
  title = "You send",
}) => {
  const [amount, setAmount] = useState<number>(value.amount);
  const [currency, setCurrency] = useState<{
    value: string | number;
    label: string;
  }>({
    value: value.currency || "",
    label: value.currency || "",
  });
  const formatToNumber = (str: string) => {
    const cleanedStr = str.replace(/[^0-9.]/g, "");
    return parseFloat(cleanedStr);
  };

  const currencyObject = value.currency
    ? {
        value: value.currency,
        label: value.currency,
      }
    : (currency as { value: string | number; label: string });

  const currencyAmount = value.amount ? value.amount : amount;
  return (
    <Style className="bg-neutral p-5 rounded-3xl flex justify-between items-center">
      <CurrencySelect
        className="w-[160px]"
        onChange={(selected: OptionType | null) => {
          if (selected) {
            setCurrency(selected as { value: string; label: string });
            if (onChange)
              onChange({
                amount: formatToNumber(currencyAmount.toString()),
                currency: selected.value,
              });
          }
        }}
        value={currencyObject}
      />

      <div className="text-right space-y-2">
        <div className="text-[12px]">{title}</div>
        <div>
          <NumericFormat
            className="w-full text-lg bg-transparent outline-none text-[1.5rem] text-right font-medium"
            allowLeadingZeros
            thousandSeparator={","}
            prefix={getSymbolFromCurrency(String(value.currency) || "")}
            value={currencyAmount}
            onChange={(e) => {
              setAmount(formatToNumber(e.target.value));
              if (onChange)
                onChange({
                  amount: formatToNumber(e.target.value),
                  currency: currencyObject.value,
                });
            }}
            placeholder={""}
            type={"text"}
          />
        </div>
      </div>
    </Style>
  );
};

const Style = styled.div`
  .css-1xc3v61-indicatorContainer {
    padding: 0px !important;
  }
  .css-15lsz6c-indicatorContainer {
    padding: 0px !important;
  }
  .css-hlgwow {
    padding: 0px !important;
  }
`;
export default RateInput;
