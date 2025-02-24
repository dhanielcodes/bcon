import BeneficiarySlip from "@/components/BeneficiarySlip";
import PageTitleSearchBox from "@/components/bits/PageTitleSearchBox";
import ConversionRateInput from "@/components/ConversionRateInput";
import DetailsCard from "@/components/DetailsCard";
import CollectByField from "@/components/fields/CollectByField";
import PayByField from "@/components/fields/PayByField";
import Divider from "@/components/icons/Divider";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { lazy, useState } from "react";
const Box = lazy(() => import("@/components/bits/Box"));

const MainSelect = lazy(() => import("@/components/fields/MainSelect"));
const AppButton = lazy(() => import("@/components/fields/AppButton"));

const Send = () => {
  return <div></div>;
};

const StepOneComponent = () => {
  return (
    <>
      <PageTitleSearchBox
        className="rounded-[40px] !w-full relative"
        title="Search Beneficiary"
        icon={<PlusIcon color="#FF7434" width={24} height={24} />}
      />

      <Box className="space-y-4">
        {Array(12)
          .fill(3)
          .map((_, idx) => {
            return (
              <div>
                <BeneficiarySlip active />
              </div>
            );
          })}
      </Box>
    </>
  );
};

const StepTwoComponent = () => {
  const [val, setVal] = useState<{
    fromCurrency: { amount: number; currency: string };
    toCurrency: { amount: number; currency: string };
  }>({
    fromCurrency: { amount: 0, currency: "GBP" } as {
      amount: number;
      currency: string;
    },
    toCurrency: { amount: 0, currency: "NGN" } as {
      amount: number;
      currency: string;
    },
  });
  return (
    <>
      <Box>
        <h1 className="text-2xl font-semibold">
          How Much Do You Want To Send?
        </h1>
      </Box>
      <Box>
        <PayByField />
      </Box>

      <Box>
        <BeneficiarySlip />
        <Divider />
        <ConversionRateInput
          onChange={(e) => {
            setVal(e);
          }}
          value={val}
        />
        <Divider />
        <CollectByField />
        <Divider />
        <MainSelect
          name="type"
          placeholder="Select purpose of transfer"
          label="Select purpose of transfer"
          options={[
            { label: "Customer", value: "customer" },
            { label: "Agent", value: "agent" },
          ]}
        />
        <MainSelect
          name="type"
          placeholder="Type"
          label="Document type"
          options={[
            { label: "Customer", value: "customer" },
            { label: "Agent", value: "agent" },
          ]}
        />
      </Box>
      <Box className="rounded-full cursor-pointer text-primary-orange flex items-center justify-center space-x-2">
        <span>Add another payment</span>
      </Box>
      <Box>
        <DetailsCard
          title="Summary"
          details={[
            { title: "You're sending", value: "$0.00" },
            { title: "Recipient gets", value: "$0.00" },
            { title: "Rate", value: "$0.00" },
            { title: "Transaction fee", value: "Free" },
          ]}
        />
      </Box>
    </>
  );
};

const StepThreeComponent = () => {
  return (
    <>
      <Box>
        <h1 className="text-2xl font-semibold">Review Your Transfer</h1>
      </Box>
      <Box>
        <DetailsCard
          title="Transfer details"
          details={[
            { title: "You're sending", value: "$0.00" },
            { title: "Recipient gets", value: "$0.00" },
            { title: "Rate", value: "$0.00" },
            { title: "Transaction fee", value: "Free" },
          ]}
        />
      </Box>
      <Box>
        <DetailsCard
          title="Recipient details"
          details={[
            { title: "You're sending", value: "$0.00" },
            { title: "Recipient gets", value: "$0.00" },
            { title: "Rate", value: "$0.00" },
            { title: "Transaction fee", value: "Free" },
          ]}
        />
      </Box>
    </>
  );
};

Send.StepOneComponent = StepOneComponent;
Send.StepTwoComponent = StepTwoComponent;
Send.StepThreeComponent = StepThreeComponent;

export { Send };
