import React, { FC, useEffect, useState } from "react";

import CurrencySelect from "./CurrencySelect";
import styled from "styled-components";
import getSymbolFromCurrency from "currency-symbol-map";
import { NumericFormat } from "react-number-format";
import { OptionType } from "@/types/form-types";
import { RateSelectType } from "@/types/types";

const RateInput: FC<{
  onChange?: (arg0: any) => void;
  value?: RateSelectType;
  title?: string;
  excludeId?: any;
}> = ({
  onChange,
  value = { amount: 0, currency: "", id: "" },
  title = "You send",
  excludeId,
}) => {
  const [amount, setAmount] = useState<number>(value.amount);
  const [currency, setCurrency] = useState<OptionType & { id: any }>({
    value: value.currency || "",
    label: value.currency || "",
    id: value?.id || "",
  });
  const formatToNumber = (str: string) => {
    const cleanedStr = str.replace(/[^0-9.]/g, "");
    return parseFloat(cleanedStr);
  };

  const currencyObject = value.currency
    ? {
        value: value.currency,
        label: value.currency,
        id: value?.id,
      }
    : (currency as OptionType);

  const currencyAmount = value.amount ? value.amount : amount;
  return (
    <Style className="bg-neutral p-5 rounded-3xl grid grid-cols-[120px_1fr]">
      <CurrencySelect
        excludeId={excludeId}
        onChange={(selected: OptionType | null) => {
          if (selected) {
            setCurrency(selected as OptionType & { id: any });
            if (onChange)
              onChange({
                amount: formatToNumber(currencyAmount.toString()),
                currency: selected.value,
                id: (selected as any).id,
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
                  id: (currencyObject as any).id,
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
