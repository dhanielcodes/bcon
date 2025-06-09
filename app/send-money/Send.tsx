import BeneficiarySlip from "@/components/BeneficiarySlip";
import PageTitleSearchBox from "@/components/bits/PageTitleSearchBox";
import ConversionRateInput from "@/components/ConversionRateInput";
import DetailsCard from "@/components/DetailsCard";
import CollectByField from "@/components/fields/CollectByField";
import FileUploadField from "@/components/fields/FileUploadField";
import PayByField from "@/components/fields/PayByField";
import Divider from "@/components/icons/Divider";
import RateInput from "@/components/RateInput";
import { FormatCurrency, formatOptions } from "@/libs/utils";
import { ApiServiceAuth } from "@/services/auth.service";
import { RateSelectType } from "@/types/types";
import { PlusIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { lazy, useEffect, useState } from "react";
const Box = lazy(() => import("@/components/bits/Box"));

const MainSelect = lazy(() => import("@/components/fields/MainSelect"));
const AppButton = lazy(() => import("@/components/fields/AppButton"));

const Send = () => {
  return <div></div>;
};

const StepOneComponent = ({ values, setFieldValue }: any) => {
  const params = useParams();

  const id = (params?.id as string)?.toLowerCase() || null;

  const { data: list } = useQuery({
    queryKey: ["GetBeneficiariesQuery"],
    queryFn: () => ApiServiceAuth.GetBeneficiariesQuery(id as string),
  });
  return (
    <>
      <PageTitleSearchBox
        className="rounded-[40px] !w-full relative"
        title="Search Beneficiary"
        showSearch={false}

        //icon={<PlusIcon color="#FF7434" width={24} height={24} />}
      />

      <Box className="space-y-4">
        {list?.data?.map((item: any, idx: number) => {
          return (
            <div key={idx}>
              <BeneficiarySlip
                slipType="input"
                item={item}
                onChange={(value) => {
                  setFieldValue("beneficiary", value);
                }}
                name="userBeneficiaryId"
              />
            </div>
          );
        })}
      </Box>
    </>
  );
};

const StepTwoComponent = ({ values, setFieldValue }: any) => {
  /*   const [val, setVal] = useState<{
    fromCurrency: RateSelectType;
    toCurrency: RateSelectType;
  }>({
    fromCurrency: { amount: 0, currency: "" } as RateSelectType,
    toCurrency: { amount: 0, currency: "" } as RateSelectType,
  }); */

  const params = useParams();

  const id = (params?.id as string)?.toLowerCase() || null;

  const { data: rates, refetch } = useQuery({
    queryKey: ["GetRatesQuery"],
    queryFn: () =>
      ApiServiceAuth.GetRatesQuery({
        userId: id,
        fromAmount: values?.from?.amount,
        toAmount: values?.to?.amount,
        roleId: 6,
        fromCurrencyId: values?.from?.id,
        toCurrencyId: values?.to?.id,
      }),
  });
  const [conversionRate, setConversionRate] = useState<number>(0);
  useEffect(() => {
    refetch();
  }, [values?.from, values?.to]);

  useEffect(() => {
    setConversionRate(rates?.data?.conversionRate);
    setFieldValue("conversionRate", rates?.data?.conversionRate);
  }, [rates]);

  useEffect(() => {
    setFieldValue("to", {
      ...values?.to,
      amount: values?.from?.amount * conversionRate,
    });
  }, [values?.from, conversionRate]);

  /*   useEffect(() => {
    setFieldValue("from", {
      ...values?.from,
      amount: values?.to?.amount / conversionRate,
    });
  }, [values?.to]); */

  console.log(rates);

  const { data: purposes } = useQuery({
    queryKey: ["GetPurposesQuery"],
    queryFn: () => ApiServiceAuth.GetPurposesQuery(),
  });

  const { data: documents } = useQuery({
    queryKey: ["GetIdTypesQuery"],
    queryFn: () => ApiServiceAuth.GetIdTypesQuery(),
  });

  return (
    <>
      <Box>
        <h1 className="text-2xl font-semibold">
          How Much Do You Want To Send?
        </h1>
      </Box>
      <Box>
        <PayByField name="paymentChannelId" />
      </Box>

      <Box>
        <BeneficiarySlip
          slipType="input"
          item={values?.beneficiary}
          name="beneficiary"
        />
        <Divider />
        <RateInput
          value={values.from}
          excludeId={values?.to?.id}
          onChange={(e) => {
            setFieldValue("fromCurrencyId", e?.id);
            setFieldValue("amount", e?.amount);
            setFieldValue("from", {
              ...e,
              amount: e?.amount || 0,
            });
          }}
        />
        <div className="flex justify-between space-x-4 my-4">
          <div className="flex w-full items-center justify-between text-sm">
            <div className="text-left space-y-4">
              <div>Rate</div>
              <div>Fee</div>
            </div>
            <div className="text-right space-y-4">
              <div>
                {FormatCurrency(1, values?.from?.currency)} ={" "}
                {FormatCurrency(
                  rates?.data?.conversionRate,
                  values?.to?.currency
                )}
              </div>
              <div>
                {FormatCurrency(
                  rates?.data?.transitionFee,
                  values?.from?.currency
                ) || "FREE"}
              </div>
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
          value={values.to}
          excludeId={values?.from?.id}
          onChange={(e) => {
            setFieldValue("toCurrencyId", e?.id);
            setFieldValue("to", {
              ...e,
              amount: e?.amount || 0,
            });
            setFieldValue("from", {
              ...values?.from,
              amount: e?.amount / conversionRate,
            });
          }}
        />
        {/*   <ConversionRateInput
          onChange={(e) => {
            console.log(e, "onchange");
            setVal({
              ...e,
              fromCurrency: {
                ...e?.fromCurrency,
                amount: e?.toCurrency?.amount / rates?.data?.conversionRate,
              },
              toCurrency: {
                ...e?.toCurrency,
                amount: e?.fromCurrency?.amount * rates?.data?.conversionRate,
              },
            });
            setFieldValue("rate", {
              ...e,
              fromCurrency: {
                ...e?.fromCurrency,
                amount: e?.toCurrency?.amount / rates?.data?.conversionRate,
              },
              toCurrency: {
                ...e?.toCurrency,
                amount: e?.fromCurrency?.amount * rates?.data?.conversionRate,
              },
            });
          }}
          value={val}
        /> */}
        <Divider />
        <CollectByField name="payoutChannelId" />
        <Divider />
        <MainSelect
          name="purpose"
          placeholder="Select purpose of transfer"
          label="Select purpose of transfer"
          options={formatOptions(purposes?.data, "name", "name")}
        />
        <MainSelect
          name="documentType"
          placeholder="Type"
          label="Document type"
          options={formatOptions(documents?.data, "name", "name")}
        />
        <Field
          name="avatar"
          userId={id}
          component={FileUploadField}
          label="Upload Profile Photo"
        />
      </Box>
      {/* <Box className="rounded-full cursor-pointer text-primary-orange flex items-center justify-center space-x-2">
        <span>Add another payment</span>
      </Box> */}
      <Box>
        <DetailsCard
          title="Summary"
          details={[
            {
              title: "You're sending",
              value: FormatCurrency(values?.amount, values?.from?.currency),
            },
            {
              title: "Recipient gets",
              value: FormatCurrency(values?.to?.amount, values?.to?.currency),
            },
            {
              title: "Rate",
              value: FormatCurrency(conversionRate, values?.to?.currency),
            },
            { title: "Transaction fee", value: rates?.data?.transitionFee },
          ]}
        />
      </Box>
    </>
  );
};

const StepThreeComponent = ({ values, setFieldValue }: any) => {
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
