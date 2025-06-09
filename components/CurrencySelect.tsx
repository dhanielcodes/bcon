import { FC, useEffect, useState } from "react";
import Select from "react-select";
import CurrencyFlagImage from "react-currency-flags";
import { cn } from "@/libs/utils";
import { CurrencySelectProps, OptionType } from "@/types/form-types";
import { ApiServiceAuth } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

const CurrencySelect: FC<CurrencySelectProps> = ({
  isSearchable = false,
  className,
  disabled = false,
  onChange,
  value,
  excludeId,
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const { data: currencies } = useQuery({
    queryKey: ["GetCurrencyQuery"],
    queryFn: () => ApiServiceAuth.GetCurrencyQuery(),
  });

  const options =
    currencies?.data
      ?.map((item: any) => {
        const option = {
          ...item,
          label: item?.code,
          value: item?.code,
          id: item?.id,
        };
        return excludeId && item?.id === excludeId ? null : option;
      })
      .filter(Boolean) || [];

  const handleChange = (selected: OptionType | null) => {
    setSelectedOption(selected);
    if (onChange) onChange(selected);
  };

  useEffect(() => {
    handleChange(options?.find((itm: any) => itm?.code === "GBP"));
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <Select
        value={value || selectedOption}
        onChange={handleChange}
        placeholder={""}
        options={options}
        isDisabled={disabled}
        isSearchable={isSearchable}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#ff5500",
            primary: "#ff5500",
          },
        })}
        formatOptionLabel={(item) => (
          <span className="flex items-center text-[18px] font-medium">
            <CurrencyFlagImage
              currency={item.value}
              className="rounded-full mr-1"
              style={{ width: "24px", height: "24px" }}
            />
            {item.label}
          </span>
        )}
        styles={{
          control: (base) => ({
            ...base,
            background: "#ffffff",
            padding: "0.35rem",
            borderColor: "#ffffff",
            borderRadius: "10px",
            "&:hover": { borderColor: "#ffffff0" },
          }),
          option: (styles) => ({
            ...styles,
            display: "flex",
            alignItems: "center",
            color: "#000",
            fontSize: "14px",
          }),
          menuList: (styles) => ({
            ...styles,
            display: "flex",
            borderRadius: "10px",
            flexDirection: "column",
            color: "#FFF",
            alignItems: "center",
          }),
          singleValue: (styles) => ({
            ...styles,
            padding: "0.4rem",
            display: "flex",
            color: "#000",
            alignItems: "center",
          }),
        }}
      />
    </div>
  );
};

export default CurrencySelect;
