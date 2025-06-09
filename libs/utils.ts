import clsx from "clsx";
import getSymbolFromCurrency from "currency-symbol-map";
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

export function parseImageUrl(imageName?: string): string {
  if (!imageName) return undefined as unknown as string;
  return imageName.includes("data:image/") || imageName.includes("http")
    ? imageName
    : "https://coventiassets2.blob.core.windows.net/coventidoc/" + imageName;
}


export function Gsh2(n: number | string) {
  return (n + "").split(".")[0];
}
export function Gsh(n: number | string) {
  return (n + "").split(".")[1];
}
export function FormatCurrency(value: number | string, currency?: string) {
  return currency
    ? Gsh(value)?.length > 3
      ? getSymbolFromCurrency(currency) +
        Gsh2(`${value}`).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        "." +
        Gsh(value)
      : getSymbolFromCurrency(currency) +
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : Gsh(value)?.length > 3
    ? Gsh2(`${value}`).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + Gsh(value)
    : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

