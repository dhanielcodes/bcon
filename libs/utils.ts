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

export function parseImageUrl(imageName?: string): string {
  if (!imageName) return undefined as unknown as string;
  return imageName.includes("data:image/") || imageName.includes("http")
    ? imageName
    : "https://coventiassets2.blob.core.windows.net/coventidoc/" + imageName;
}