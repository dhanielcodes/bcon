"use client";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";
import { Send } from "./Send";
import Box from "@/components/bits/Box";
import Stepper from "@/components/Stepper";
import { useState } from "react";
import BackBtn from "@/components/bits/BackBtn";
import AppButton from "@/components/fields/AppButton";
import { useParams } from "next/navigation";

export default function Page() {
  const [active, setActive] = useState<number>(1);

  let onSubmit: () => void;

  const params = useParams();

  const id = (params?.id as string)?.toLowerCase() || null;

  return (
    <div>
      <Box className="rounded-t-none flex justify-between items-center">
        <BackBtn />
        <div className="grid place-items-center w-1/2">
          <Stepper steps={3} active={active} setActive={setActive} />
        </div>
        <div></div>
      </Box>
      <Formik
        initialValues={{
          userId: id,
          userBeneficiaryId: "",
          fromCurrencyId: 3,
          toCurrencyId: 1,
          from: { amount: 0, currency: "GBP", id: 3 },
          to: { amount: 0, currency: "NGN", id: 1 },
          amount: 0,
          paymentChannelId: "",
          walletId: 0,
          payoutChannelId: "",
          purpose: "",
          note: "",
          transactionSource: "Web",
          promoCode: "",
          redirectURL: "https://www.google.com/",
          source: "web",
        }}
        //validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
          //setActive((curr) => curr + 1);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          onSubmit = handleSubmit;

          console.log(values, "values");
          return (
            <Form onSubmit={handleSubmit}>
              {active === 1 && (
                <Send.StepOneComponent
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
              {active === 2 && (
                <Send.StepTwoComponent
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
              {active === 3 && (
                <Send.StepThreeComponent
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
            </Form>
          );
        }}
      </Formik>
      {active === 1 && (
        <>
          <Box className="opacity-0">
            <AppButton placeholder="Submit" />
          </Box>
          <Box className="rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 max-width-util mb-0">
            <AppButton
              onClick={() => {
                setActive((curr) => curr + 1);
              }}
              placeholder="Proceed"
            />
          </Box>
        </>
      )}
      {active === 2 && (
        <>
          <Box className="opacity-0">
            <AppButton placeholder="Submit" />
          </Box>
          <Box className="rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 max-width-util mb-0 space-x-2 grid grid-cols-[1fr_2fr]">
            <AppButton
              onClick={() => {
                setActive && setActive((curr) => curr - 1);
              }}
              placeholder="Back"
              outline
              className="mt-0"
            />
            <AppButton
              onClick={() => {
                setActive((curr) => curr + 1);
              }}
              placeholder="Continue"
              className="mt-0"
            />
          </Box>
        </>
      )}
      {active === 3 && (
        <>
          <Box className="opacity-0">
            <AppButton placeholder="Submit" />
          </Box>
          <Box className="rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 max-width-util mb-0 space-x-2 grid grid-cols-[1fr_2fr]">
            <AppButton
              onClick={() => {
                setActive && setActive((curr) => curr - 1);
              }}
              placeholder="Back"
              outline
              className="mt-0"
            />
            <AppButton
              onClick={() => {
                onSubmit();
              }}
              placeholder="Send money"
              className="mt-0"
            />
          </Box>
        </>
      )}
    </div>
  );
}
