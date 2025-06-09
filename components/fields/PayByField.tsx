import { cn } from "@/libs/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { FC } from "react";
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

const PayByField = ({ name }: { name: string }) => {
  const { data: paymentChannels } = useQuery({
    queryKey: ["GetPaymentChannelsQuery"],
    queryFn: () => ApiServiceAuth.GetPaymentChannelsQuery(),
  });

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
                  <div>
                    <Card
                      onClick={() => {
                        if (item?.status) {
                          form.setFieldValue(name, item?.id);
                        }
                      }}
                      style={{
                        opacity: item?.status ? 1 : 0.6,
                        cursor: item?.status ? "pointer" : "not-allowed",
                      }}
                      key={idx}
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
        active ? "border-primary-orange" : "border-neutral"
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
    </div>
  );
};

export default PayByField;
