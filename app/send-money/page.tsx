"use client";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";
import { Send } from "./Send";
import Box from "@/components/bits/Box";
import Stepper from "@/components/Stepper";
import { useEffect, useState } from "react";
import BackBtn from "@/components/bits/BackBtn";
import AppButton from "@/components/fields/AppButton";
import { useParams, useRouter } from "next/navigation";
import useSendMoney from "@/hooks/sendMoney";
import { ApiServiceAuth } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { stepOneSchema, stepTwoSchema, stepThreeSchema } from "./validation";

const SuccessModal = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircledIcon className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold">Transaction Successful!</h2>
          <p className="text-gray-600">{data?.message}</p>

          <AppButton
            onClick={() => {
              window.location.replace(data?.data?.response);
            }}
            placeholder="Proceed"
            className="w-full mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const [active, setActive] = useState<number>(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate, isPending, data } = useSendMoney();
  const router = useRouter();

  const { data: dashboard } = useQuery({
    queryKey: ["GetDashboardService"],
    queryFn: () => ApiServiceAuth.GetDashboardService(id),
  });

  let onSubmit: () => void;

  const params = useParams();

  const id = (params?.id as string)?.toLowerCase() || null;

  useEffect(() => {
    if (data) {
      setShowSuccessModal(true);
    }
  }, [data]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push("/dashboard");
  };

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
          from: { currency: "GBP", id: 3 },
          to: { currency: "NGN", id: 1 },
          amount: 0,
          paymentChannelId: "",
          name: "",
          walletId: 0,
          payoutChannelId: "",
          purpose: "",
          note: "",
          transactionSource: "Web",
          promoCode: "",
          redirectURL: "https://www.google.com/",
          source: "web",
          sendMoneyDataList: [],
          transitionFee: "",
        }}
        validationSchema={
          active === 1
            ? stepOneSchema
            : active === 2
            ? stepTwoSchema
            : stepThreeSchema
        }
        onSubmit={(values) => {
          if (active === 3) {
            mutate({
              userId: Number(id),
              totalAmount: (values?.sendMoneyDataList || []).reduce(
                (acc: number, curr: { amount: number }) =>
                  acc + (curr?.amount || 0),
                0
              ),
              transitionFee: values?.transitionFee || 0,
              fromCurrencyId: values?.fromCurrencyId,
              toCurrencyId: values?.toCurrencyId,
              paymentChannelId: values?.paymentChannelId,
              payoutChannelId: values?.payoutChannelId,
              walletId: 0,
              redirectURL:
                "https://dashboard.transferrocket.co.uk/user/sendmoney",
              transactionSource: "web",
              transactionLocation: "",
              senderName: dashboard?.data?.firstName || values?.name,
              sendMoneyDataList: values?.sendMoneyDataList?.map((itm: any) => {
                return {
                  userBeneficiaryId: itm?.userBeneficiaryId,
                  amount: itm?.amount,
                  purpose: itm?.purpose,
                  note: "",
                  documentTypeId: Number(itm?.documentTypeId) || 0,
                  documentURL: itm?.documentURL || "",
                };
              }),
            });
          } else {
            setActive((curr) => curr + 1);
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          onSubmit = handleSubmit;

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
                  dashboard={dashboard}
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
          <Box className="opacity-0 cursor-default">
            <AppButton
              disabled
              placeholder="Submit"
              className="cursor-default"
            />
          </Box>
          <Box className="rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 max-width-util mb-0">
            <AppButton
              onClick={() => {
                onSubmit();
              }}
              placeholder="Proceed"
            />
          </Box>
        </>
      )}
      {active === 2 && (
        <>
          <Box className="opacity-0 cursor-default">
            <AppButton
              disabled
              placeholder="Submit"
              className="cursor-default"
            />
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
              placeholder="Continue"
              className="mt-0"
            />
          </Box>
        </>
      )}
      {active === 3 && (
        <>
          <Box className="opacity-0 cursor-default">
            <AppButton
              disabled
              placeholder="Submit"
              className="cursor-default"
            />
          </Box>
          <Box className="rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 max-width-util mb-0 space-x-2 grid grid-cols-[1fr_2fr]">
            <AppButton
              onClick={() => {
                setActive && setActive((curr) => curr - 1);
              }}
              loading={isPending}
              disabled={isPending}
              placeholder="Back"
              outline
              className="mt-0"
            />
            <AppButton
              onClick={() => {
                onSubmit();
              }}
              loading={isPending}
              disabled={isPending}
              placeholder="Send money"
              className="mt-0"
            />
          </Box>
        </>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        data={data}
      />
    </div>
  );
}
