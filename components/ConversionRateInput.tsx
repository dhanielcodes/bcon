import React, { lazy } from "react";
const RateInput = lazy(() => import("@/components/RateInput"));

const ConversionRateInput = () => {
  return (
    <div>
      <RateInput
        onChange={(e) => {
          console.log(e, "rate in");
          setValue(e);
        }}
        value={value}
      />
      <br />
      <RateInput
        title="Receiver gets"
        onChange={(e) => {
          console.log(e, "rate in");
          setValue(e);
        }}
        value={value}
      />
    </div>
  );
};

export default ConversionRateInput;
