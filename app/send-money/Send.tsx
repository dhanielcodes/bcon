import BeneficiarySlip from "@/components/BeneficiarySlip";
import PageTitleSearchBox from "@/components/bits/PageTitleSearchBox";
import ConversionRateInput from "@/components/ConversionRateInput";
import CurrencySelect from "@/components/CurrencySelect";
import DetailsCard from "@/components/DetailsCard";
import CollectByField from "@/components/fields/CollectByField";
import FileUploadField from "@/components/fields/FileUploadField";
import FormInput from "@/components/fields/FormInput";
import PayByField from "@/components/fields/PayByField";
import Divider from "@/components/icons/Divider";
import RateInput from "@/components/RateInput";
import { FormatCurrency, formatOptions, formatToNumber } from "@/libs/utils";
import { ApiServiceAuth } from "@/services/auth.service";
import { OptionType } from "@/types/form-types";
import { RateSelectType } from "@/types/types";
import { CheckCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import getSymbolFromCurrency from "currency-symbol-map";
import { Field } from "formik";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { lazy, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";
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

  const handleBeneficiarySelect = (value: any) => {
    const currentList = values.sendMoneyDataList || [];
    const existingIndex = currentList.findIndex(
      (item: any) => item.userBeneficiaryId === value.id
    );

    if (existingIndex === -1) {
      setFieldValue("sendMoneyDataList", [
        ...currentList,
        {
          userBeneficiaryId: value.id,
          beneficiaryDetails: value,
          amount: "",
          purpose: "",
          note: "",
          documentTypeId: "",
          documentURL: "",
        },
      ]);
    } else {
      // Remove if already selected
      const newList = currentList.filter(
        (item: any) => item.userBeneficiaryId !== value.id
      );
      setFieldValue("sendMoneyDataList", newList);
    }
  };

  return (
    <>
      <PageTitleSearchBox
        className="rounded-[40px] !w-full relative"
        title="Search Beneficiary"
        showSearch={false}
      />

      <Box className="space-y-4">
        {list?.data?.map((item: any, idx: number) => {
          return (
            <div key={idx}>
              <BeneficiarySlip
                slipType="input"
                item={item}
                onChange={handleBeneficiarySelect}
                name="sendMoneyDataList"
              />
            </div>
          );
        })}
      </Box>
    </>
  );
};

const StepTwoComponent = ({ values, setFieldValue, dashboard }: any) => {
  const params = useParams();
  const id = (params?.id as string)?.toLowerCase() || null;

  const {
    mutate,
    isPending,
    data: documents,
  } = useMutation({
    mutationFn: ApiServiceAuth.CheckUserDocumentMutation,
    onSuccess: (data) => {
      //route("/dashboard");
      //  window.location.pathname = "/dashboard";
    },
    onError: (data) => {
      return;
    },
  });

  const fullAmount = values.sendMoneyDataList?.reduce(
    (sum: number, item: any) => sum + (item?.amount || 0),
    0
  );

  const fullConvertedAmount = values.sendMoneyDataList?.reduce(
    (sum: number, item: any) => sum + (item?.to?.amount || 0),
    0
  );

  const { data: rates, refetch } = useQuery({
    queryKey: ["GetRatesQuery", values?.from?.id, values?.to?.id, fullAmount],
    queryFn: () =>
      dashboard?.data?.agentId === 0
        ? ApiServiceAuth.GetRatesQuery({
            userId: id,
            fromAmount: fullAmount || 0,
            toAmount: fullConvertedAmount || 0,
            roleId: dashboard?.data?.role?.id,
            fromCurrencyId: values?.from?.id,
            toCurrencyId: values?.to?.id,
          })
        : ApiServiceAuth.GetRatesAgentQuery({
            userId: id,
            fromAmount: fullAmount || 0,
            toAmount: fullConvertedAmount || 0,
            agentId: dashboard?.data?.agentId,
            fromCurrencyId: values?.from?.id,
            toCurrencyId: values?.to?.id,
          }),
    enabled: Boolean(dashboard?.data && values?.from?.id && values?.to?.id),
  });

  const [conversionRate, setConversionRate] = useState<number>(0);

  useEffect(() => {
    if (rates?.data?.conversionRate) {
      setConversionRate(rates.data.conversionRate);
      setFieldValue("conversionRate", rates.data.conversionRate);
      setFieldValue("fee", rates.data.transitionFee);
    }
  }, [rates?.data?.conversionRate, rates?.data?.transitionFee]);

  const getCategoryCurrency = dashboard?.data?.accountCategory?.find(
    (itm: any) => itm?.currency?.code === values?.from?.currency
  );

  useEffect(() => {
    if (fullAmount && getCategoryCurrency) {
      mutate({
        userId: id,
        transactionAmount: fullAmount,
        proofOfAddressAmountThreshold:
          getCategoryCurrency?.proofOfAddressAmountThreshold,
        sourceOfFundAmountThreshold:
          getCategoryCurrency?.sourceOfFundAmountThreshold,
      });
    }
  }, [fullAmount, getCategoryCurrency]);

  const { data: purposes } = useQuery({
    queryKey: ["GetPurposesQuery"],
    queryFn: () => ApiServiceAuth.GetPurposesQuery(),
  });

  const { data: paymentChannels } = useQuery({
    queryKey: ["GetPaymentChannelsQuery"],
    queryFn: () => ApiServiceAuth.GetPaymentChannelsQuery(),
  });

  const getActiveList = paymentChannels?.data?.filter(
    (itm: any) => itm?.status
  );

  useEffect(() => {
    if (getActiveList?.length === 1 && !values.paymentChannelId) {
      setFieldValue("paymentChannelId", getActiveList[0].id);
      setFieldValue("paymentChannel", getActiveList[0]);
    }
  }, [getActiveList, values.paymentChannelId]);

  const { data: payoutChannels } = useQuery({
    queryKey: ["GetPayoutChannelsQuery"],
    queryFn: () => ApiServiceAuth.GetPayoutChannelsQuery(),
  });

  const getActiveListPayout = payoutChannels?.data?.filter(
    (itm: any) => itm?.status
  );

  useEffect(() => {
    if (getActiveListPayout?.length === 1 && !values.payoutChannelId) {
      setFieldValue("payoutChannelId", getActiveListPayout[0].id);
    }
  }, [getActiveListPayout, values.payoutChannelId]);

  return (
    <>
      <Box>
        <h1 className="text-2xl font-semibold">
          How Much Do You Want To Send?
        </h1>
      </Box>
      <Box>
        <PayByField
          paymentChannels={paymentChannels}
          setValue={setFieldValue}
          name="paymentChannelId"
          onChange={(e) => {
            setFieldValue("paymentChannel", e);
          }}
        />
      </Box>

      <Box className="">
        <div className="flex space-x-10">
          <CurrencySelect
            excludeId={values?.to?.id}
            onChange={(selected: any | null) => {
              setFieldValue("from", {
                id: selected?.id,
                currency: selected?.code,
              });
              setFieldValue("fromCurrencyId", selected?.id);
            }}
            value={values?.from?.currency}
          />
          <CurrencySelect
            excludeId={values?.from?.id}
            onChange={(selected: any | null) => {
              setFieldValue("to", {
                id: selected?.id,
                currency: selected?.code,
              });
              setFieldValue("toCurrencyId", selected?.id);
            }}
            value={values?.to?.currency}
          />
        </div>
        <br />
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
                  rates?.data?.conversionRate || 0,
                  values?.to?.currency
                )}
              </div>
              <div>
                {FormatCurrency(
                  rates?.data?.transitionFee || 0,
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
      </Box>

      {values.sendMoneyDataList?.map((beneficiary: any, index: number) => (
        <Box key={index}>
          <div className="mb-6">
            <BeneficiarySlip
              disabled
              slipType="normal"
              item={beneficiary?.beneficiaryDetails}
              name={`sendMoneyDataList.${index}.userBeneficiaryId`}
            />
            <Divider />

            <div className="text-right space-y-2 bg-neutral p-5 rounded-3xl mb-4">
              <div className="text-[20px]">You send</div>
              <div>
                <NumericFormat
                  className="w-full text-lg bg-transparent outline-none text-[1.5rem] text-right font-medium"
                  allowLeadingZeros
                  thousandSeparator={","}
                  prefix={getSymbolFromCurrency(
                    String(values?.from.currency) || ""
                  )}
                  value={beneficiary?.from?.amount}
                  onChange={(e) => {
                    setFieldValue(
                      `sendMoneyDataList.${index}.from.amount`,
                      formatToNumber(e.target.value)
                    );
                    setFieldValue(
                      `sendMoneyDataList.${index}.amount`,
                      formatToNumber(e.target.value)
                    );
                    setFieldValue(
                      `sendMoneyDataList.${index}.to.amount`,
                      formatToNumber(e.target.value) * conversionRate
                    );
                  }}
                  placeholder={""}
                  type={"text"}
                />
              </div>
            </div>

            <div className="text-right space-y-2 bg-neutral p-5 rounded-3xl ">
              <div className="text-[20px]">You receive</div>
              <div>
                <NumericFormat
                  className="w-full text-lg bg-transparent outline-none text-[1.5rem] text-right font-medium"
                  allowLeadingZeros
                  thousandSeparator={","}
                  prefix={getSymbolFromCurrency(
                    String(values?.to.currency) || ""
                  )}
                  value={beneficiary?.to?.amount}
                  onChange={(e) => {
                    setFieldValue(
                      `sendMoneyDataList.${index}.to.amount`,
                      formatToNumber(e.target.value)
                    );
                    setFieldValue(
                      `sendMoneyDataList.${index}.amount`,
                      formatToNumber(e.target.value)
                    );
                    setFieldValue(
                      `sendMoneyDataList.${index}.from.amount`,
                      formatToNumber(e.target.value) / conversionRate
                    );
                  }}
                  placeholder={""}
                  type={"text"}
                />
              </div>
            </div>
            <Divider />
            <MainSelect
              name={`sendMoneyDataList.${index}.purpose`}
              placeholder="Select purpose of transfer"
              label="Select purpose of transfer"
              options={formatOptions(purposes?.data, "name", "name")}
            />
            {formatOptions(documents?.data || [], "name", "id")?.length ? (
              <>
                <MainSelect
                  name={`sendMoneyDataList.${index}.documentType`}
                  placeholder="Type"
                  label="Document type"
                  options={
                    formatOptions(documents?.data || [], "name", "id")?.length
                      ? formatOptions(documents?.data, "name", "id")
                      : []
                  }
                />

                <FileUploadField
                  name={`sendMoneyDataList.${index}.documentURL`}
                  userId={id as string}
                  label="Upload Document"
                />
              </>
            ) : (
              ""
            )}
          </div>
        </Box>
      ))}
      <Box>
        {!values?.confirmSender ? (
          <FormInput label="Sender's Name (optional)" name="name" type="text" />
        ) : (
          ""
        )}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="confirm-sender"
            name="confirmSender"
            checked={values?.confirmSender}
            onChange={(e) => {
              setFieldValue("confirmSender", e?.target?.checked);
            }}
            className="w-4 h-4 rounded border-gray-300 text-primary-orange focus:ring-primary-orange"
          />
          <label htmlFor="confirm-sender" className="text-sm text-gray-600">
            Use my account's name as sender
          </label>
        </div>
      </Box>
      <Box>
        <CollectByField
          payoutChannels={payoutChannels}
          setValue={setFieldValue}
          name={`payoutChannelId`}
        />
      </Box>
      <Box>
        <DetailsCard
          title="Summary"
          details={[
            {
              title: "Total Amount",
              value: FormatCurrency(
                values.sendMoneyDataList?.reduce(
                  (sum: number, item: any) => sum + (item.amount || 0),
                  0
                ),
                values?.from?.currency
              ),
            },
            {
              title: "Total Recipients",
              value: values.sendMoneyDataList?.length || 0,
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
            {
              title: "You're sending",
              value: FormatCurrency(
                values.sendMoneyDataList?.reduce(
                  (sum: number, item: any) => sum + (item.amount || 0),
                  0
                ),
                values?.from?.currency
              ),
            },
            {
              title: "Recipient(s) gets",
              value: FormatCurrency(
                values.sendMoneyDataList?.reduce(
                  (sum: number, item: any) => sum + (item?.to.amount || 0),
                  0
                ),
                values?.to?.currency
              ),
            },
            {
              title: "Rate",
              value: FormatCurrency(
                values?.conversionRate,
                values?.to?.currency
              ),
            },
            {
              title: "Transaction fee",
              value: FormatCurrency(values?.fee, values?.from?.currency),
            },
            { title: "You Pay By", value: values?.paymentChannel?.name },
          ]}
        />
      </Box>
      {values?.sendMoneyDataList?.map((item: any) => {
        return (
          <Box>
            <DetailsCard
              title="Recipient details"
              details={[
                {
                  title: "Receivers Name",
                  value: item?.beneficiaryDetails?.beneficiaryBank?.accountName,
                },
                {
                  title: "Bank Name",
                  value: item?.beneficiaryDetails?.beneficiaryBank?.bankName,
                },
                {
                  title: "Account Number",
                  value:
                    item?.beneficiaryDetails?.beneficiaryBank?.accountNumber,
                },
                {
                  title: "You're sending",
                  value: FormatCurrency(item?.amount, values?.from?.currency),
                },
                {
                  title: "Beneficiary Gets",
                  value: FormatCurrency(item?.to?.amount, values?.to?.currency),
                },
                {
                  title: "Rate",
                  value: FormatCurrency(
                    values?.conversionRate,
                    values?.to?.currency
                  ),
                },
                {
                  title: "Transaction fee",
                  value: FormatCurrency(values?.fee, values?.from?.currency),
                },
              ]}
            />
          </Box>
        );
      })}
    </>
  );
};

const StepFourComponent = ({ values, data, onClose }: any) => {
  return (
    <>
      <Box className="rounded-t-none">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircledIcon className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold">
            {data?.data?.accountName
              ? "Transaction Submitted Successfully"
              : "Transaction Successful!"}
          </h2>
          <p className="text-gray-600">{data?.message}</p>
        </div>
      </Box>

      <Box>
        <DetailsCard
          title=""
          details={[
            {
              title: "Account Name",
              value: (
                <div className="flex items-center space-x-2">
                  <div>{data?.data?.accountName} </div>
                  <Copy
                    size={20}
                    onClick={() => {
                      navigator.clipboard.writeText(data?.data?.accountName);
                      toast("Account Name Copied");
                    }}
                  />
                </div>
              ),
            },
            {
              title: "Bank Name",
              value: (
                <div className="flex items-center space-x-2">
                  <div>{data?.data?.bankName} </div>
                  <Copy
                    size={20}
                    onClick={() => {
                      navigator.clipboard.writeText(data?.data?.bankName);
                      toast("Bank Name Copied");
                    }}
                  />
                </div>
              ),
            },
            {
              title: "Account Number",
              value: (
                <div className="flex items-center space-x-2">
                  <div>{data?.data?.accountNumber} </div>
                  <Copy
                    size={20}
                    onClick={() => {
                      navigator.clipboard.writeText(data?.data?.accountNumber);
                      toast("Account Number Copied");
                    }}
                  />
                </div>
              ),
            },
            /*    {
              title: "Transaction Reference",
              value: data?.data?.accountNumber,
            }, */
            {
              title: "Transaction Date",
              value: data?.data?.dateCreated,
            },
            {
              title: "You sent",
              value: FormatCurrency(
                (values?.sendMoneyDataList || []).reduce(
                  (acc: number, curr: { amount: number }) =>
                    acc + (curr?.amount || 0),
                  0
                ),
                values?.from?.currency
              ),
            },
            {
              title: "Rate",
              value: FormatCurrency(
                values?.conversionRate,
                values?.to?.currency
              ),
            },
            {
              title: "Recipients Gets",
              value: FormatCurrency(
                values.sendMoneyDataList?.reduce(
                  (sum: number, item: any) => sum + (item?.to.amount || 0),
                  0
                ),
                values?.to?.currency
              ),
            },
            {
              title: "Transaction fee",
              value: FormatCurrency(values?.fee, values?.from?.currency),
            },
            {
              title: "Sort Code",
              value: data?.data?.sortCode,
            },
          ]}
        />
      </Box>
    </>
  );
};

Send.StepOneComponent = StepOneComponent;
Send.StepTwoComponent = StepTwoComponent;
Send.StepThreeComponent = StepThreeComponent;
Send.StepFourComponent = StepFourComponent;

export { Send };
