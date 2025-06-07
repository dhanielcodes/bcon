import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: any) => {
  return twMerge(clsx(inputs));
};

export const formatOptions = <T extends Record<string, any>>(
  options: T[],
  optionLabel?: keyof T,
  optionValue?: keyof T
) => {
  return options?.map((item) => {
    return {
      ...item,
      label: optionLabel ? item[optionLabel] : item,
      value: optionValue ? item[optionValue] : item,
    };
  });
};
