import { FC, useState } from "react";
import Select from "react-select";
import CurrencyFlagImage from "react-currency-flags";
import { cn } from "@/libs/utils";

interface OptionType {
  value: string | number;
  label: string;
}

interface CurrencySelectProps {
  isSearchable?: boolean;
  className?: string;
  disabled?: boolean;
  onChange?: (selected: OptionType | null) => void;
}

const CurrencySelect: FC<CurrencySelectProps> = ({
  isSearchable = false,
  className,
  disabled = false,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const options = [
    { label: "USD", value: "USD" },
    { label: "NGN", value: "NGN" },
  ];

  const handleChange = (selected: OptionType | null) => {
    setSelectedOption(selected);
    if (onChange) onChange(selected);
  };

  return (
    <div className={cn("w-full", className)}>
      <Select
        value={selectedOption}
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
          <span className="flex items-center text-sm font-bold">
            <CurrencyFlagImage
              currency={item.value}
              className="rounded-full mr-2"
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
