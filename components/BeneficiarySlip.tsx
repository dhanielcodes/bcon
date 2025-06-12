import { cn } from "@/libs/utils";
import { Field, FieldProps } from "formik";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  item?: any;
  slipType?: "input" | "normal";
  optionValue?: string;
  onChange?: (arg0: any) => void;
  disabled?: boolean;
}

const BeneficiarySlip: FC<Props> = ({
  name,
  item,
  slipType = "normal",
  optionValue = "id",
  onChange,
  disabled,
  ...props
}) => {
  function InputSlip() {
    return (
      <Field name={name}>
        {({ form, meta }: FieldProps) => {
          const data: any[] = form.values?.sendMoneyDataList;
          const isSelected = data
            ?.map((itm: any) => itm?.userBeneficiaryId)
            ?.includes(item?.id);

          return (
            <div
              onClick={() => {
                if (disabled) {
                } else {
                  /*     if (Array.isArray(form.values?.[name as string])) {
                    const currentList = form.values?.[name as string] || [];
                    const newList = currentList.includes(item?.[optionValue])
                      ? currentList.filter(
                          (id: any) => id !== item?.[optionValue]
                        )
                      : [...currentList, item?.[optionValue]];
                    form.setFieldValue(name as string, newList);
                  } else {
                    form.setFieldValue(name as string, item?.[optionValue]);
                  } */
                  onChange && onChange(item);
                }
              }}
              className={cn(
                "relative border border-neutral cursor-pointer bg-white px-4 py-3 space-x-2 rounded-2xl flex justify-between items-center",
                isSelected && "border-primary-orange"
              )}
              {...props}
            >
              <Image
                alt="beneficiary"
                width={30}
                height={30}
                src="/icons/profile.png"
                className="rounded-full"
              />
              <div className="flex w-full items-center justify-between text-sm">
                <div className="text-left space-y-1">
                  <div>{item?.beneficiaryName}</div>
                  <div className="text-sm text-neutral3">
                    {item?.beneficiaryBank?.bankName}
                  </div>
                </div>
                <div className="text-lg ">
                  ••••{item?.beneficiaryBank?.accountNumber?.slice(6, 10)}
                </div>
              </div>

              {isSelected && (
                <svg
                  className="absolute right-0 top-0"
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
        }}
      </Field>
    );
  }

  function NormalSlip() {
    return (
      <div
        className={cn(
          "relative border border-neutral cursor-pointer bg-white px-4 py-3 space-x-2 rounded-2xl flex justify-between items-center"
        )}
        {...props}
      >
        <Image
          alt="beneficiary"
          width={30}
          height={30}
          src="/icons/profile.png"
          className="rounded-full"
        />
        <div className="flex w-full items-center justify-between text-sm">
          <div className="text-left space-y-1">
            <div>{item?.name || item?.beneficiaryName || "Daniel Falana"}</div>
            <div className="text-sm text-neutral3">
              {item?.bank || item?.beneficiaryBank?.bankName || "Access Bank"}
            </div>
          </div>
          <div className="text-lg ">
            ••••
            {item?.number ||
              item?.beneficiaryBank?.accountNumber?.slice(6, 10) ||
              "9090"}
          </div>
        </div>
      </div>
    );
  }
  return slipType === "input" ? InputSlip() : NormalSlip();
};

export default BeneficiarySlip;
