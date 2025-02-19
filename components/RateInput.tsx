import React, { FC } from "react";
import CurrencySelect from "./CurrencySelect";
import styled from "styled-components";

const RateInput: FC = () => {
  return (
    <Style className="bg-neutral p-5 rounded-3xl">
      <CurrencySelect className="w-[100px]" />
    </Style>
  );
};

const Style = styled.div`
  .css-1xc3v61-indicatorContainer {
    padding: 0px !important;
  }
  .css-hlgwow {
    padding: 0px !important;
  }
`;
export default RateInput;
