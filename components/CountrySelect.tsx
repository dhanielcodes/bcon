import { FC, useState } from "react";
import Select from "react-select";
import { cn } from "@/libs/utils";
import CurrencyFlagImage from "react-currency-flags";
import { CountrySelectProps, OptionType } from "@/types/form-types";

const CountrySelect: FC<CountrySelectProps> = ({
  isSearchable = true,
  className,
  disabled = false,
  cutBorder = false,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const options: OptionType[] = [
    { label: "British Pounds", value: "USD" },
    { label: "Nigerian Naira", value: "NGN" },
  ];

  const handleChange = (newValue: OptionType | null) => {
    setSelectedOption(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className={cn("w-full mb-3", className)}>
      <Select
        value={selectedOption}
        options={options}
        onChange={handleChange}
        placeholder="Select Currency"
        isDisabled={disabled}
        isSearchable={isSearchable}
        className={cn(
          `mt-2 w-full border-[#ffffff22] bg-[#ffffff22] text-gray-800 ${
            cutBorder ? "border-l-0 border-t-0 border-r-0" : "border"
          } rounded-full shadow-sm focus:ring focus:ring-orange-300`
        )}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#ff5500",
            primary: "#ff5500",
          },
        })}
        formatOptionLabel={(item: OptionType) => (
          <span className="flex items-center text-black text-sm">
            <CurrencyFlagImage
              currency={item.value}
              className="rounded-full mr-2"
              width={24}
              height={24}
            />
            {item.label}
          </span>
        )}
        styles={{
          control: (base, { isFocused }) => ({
            ...base,
            background: "#ffffff22",
            padding: "0.35rem",
            borderColor: "#ffffff22",
            borderRadius: "999px",
            boxShadow: isFocused ? "0 0 0 2px rgba(249, 167, 2, 0.2)" : "none",
            "&:hover": {
              borderColor: "#f9a702",
            },
          }),
          option: (styles) => ({
            ...styles,
            display: "flex",
            alignItems: "center",
            //borderRadius: "6px",
            color: "#000",
            width: "100%",
            fontSize: "30px",
            //   border:"0.1px solid #d8d8d8",
            //   backgroundColor:"#e4e4e4",
            //   borerRadius:"18px"
          }),
          menuList: (styles) => ({
            ...styles,
            display: "flex",
            backgroundColor: "#fff",
            borderRadius: "10px",
            flexDirection: "column",
            // gap:"10px",
            color: "#FFF",
            width: "100%",
            alignItems: "center",
          }),

          singleValue: (styles) => ({
            ...styles,
            display: "flex",
            width: "100%",
            color: "#000",
            alignItems: "center",
            "> svg": {
              marginRight: "8px",
              borderRadius: "50%",
            },
          }),
        }}
      />
    </div>
  );
};

export default CountrySelect;
