import { cn } from "@/libs/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { FC, useEffect } from "react";
import { SendCardProps } from "@/types/types";
import { ApiServiceAuth } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { Field, FieldProps } from "formik";

const getPaymentImage = (channelName: string) => {
  // Convert to lowercase for case-insensitive matching
  const name = channelName.toLowerCase();

  if (name?.toLowerCase()?.includes("bank")) return "/icons/bank.svg";
  if (name?.toLowerCase()?.includes("card")) return "/icons/card.svg";
  if (name?.toLowerCase()?.includes("wallet")) return "/icons/wallet.svg";
  // Default to bank icon if no match
  return "/icons/bank.svg";
};

const PayByField = ({
  name,
  setValue,
  onChange,
  paymentChannels,
}: {
  name: string;
  setValue: any;
  onChange?: (arg0: any) => void;
  paymentChannels: any;
}) => {
  return (
    <div className="space-y-4">
      <h1 className="text-neutral3 text-sm flex space-x-2 items-center">
        How do you want to pay? <InfoCircledIcon />
      </h1>

      <Field name={name}>
        {({ form, meta }: FieldProps) => {
          return (
            <div className="grid grid-cols-2 gap-2">
              {paymentChannels?.data?.map((item: any, idx: number) => {
                return (
                  <div key={idx}>
                    <Card
                      onClick={() => {
                        if (item?.status) {
                          form.setFieldValue(name, item?.id);
                          onChange && onChange(item);
                        }
                      }}
                      style={{
                        opacity: item?.status ? 1 : 0.6,
                        cursor: item?.status ? "pointer" : "not-allowed",
                      }}
                      img={getPaymentImage(item?.name)}
                      name={item?.name}
                      active={item?.id === meta.value}
                    />
                  </div>
                );
              })}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

const Card: FC<SendCardProps> = ({ active, name, img = "", ...props }) => {
  return (
    <div
      className={cn(
        "relative border cursor-pointer bg-white px-4 py-3 space-y-2 rounded-2xl text-sm",
        active ? "border-primary-orange text-primary-orange" : "border-neutral"
      )}
      {...props}
    >
      <Image
        alt="pdf"
        width={30}
        height={30}
        src={img}
        className="rounded-full"
      />
      <div>{name}</div>
      {active && (
        <svg
          className="absolute right-2 top-0"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.466535"
            y="0.466535"
            width="15.0669"
            height="15.0669"
            rx="6.99803"
            fill="#FF7434"
          />
          <rect
            x="0.466535"
            y="0.466535"
            width="15.0669"
            height="15.0669"
            rx="6.99803"
            stroke="#FF7434"
            strokeWidth="0.933071"
          />
          <path
            d="M11.1104 5.66748L6.83379 9.94406L4.88989 8.00016"
            stroke="white"
            strokeWidth="1.55512"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default PayByField;
