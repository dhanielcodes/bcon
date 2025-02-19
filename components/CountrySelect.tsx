import { FC } from "react";
import Select, { GetOptionLabel } from "react-select";
import { Field, FieldProps, useField } from "formik";
import { cn } from "@/libs/utils";
import CurrencyFlagImage from "react-currency-flags";

interface OptionType {
  value: string | number;
  label: string;
}

interface MainSelectProps {
  label?: string;
  labelColor?: string;
  name: string;
  isSearchable?: boolean;
  hint?: string;
  className?: string;
  disabled?: boolean;
  cutBorder?: boolean;
  onChange?: (selected: OptionType | null) => void;
}

const CountrySelect: FC<MainSelectProps> = ({
  label,
  labelColor = "text-black",
  name,
  isSearchable = true,
  hint,
  className,
  disabled = false,
  cutBorder = false,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);

  const options = [
    {
      label: "British Pounds",
      value: "USD",
    },
    {
      label: "Nigerian Naira",
      value: "NGN",
    },
  ];

  return (
    <div className={cn("w-full mb-3", className)}>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <Select
            id={name}
            name={field.name}
            value={
              options.find(
                (option: OptionType) => option.value === field.value
              ) || null
            }
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#ff5500",
                primary: "#ff5500",
              },
            })}
            options={options}
            onChange={(newValue, actionMeta) => {
              const selectedOption = newValue as OptionType | null;
              helpers.setValue(selectedOption ? selectedOption.value : "");
              if (onChange) onChange(selectedOption);
            }}
            placeholder=""
            onBlur={field.onBlur}
            isDisabled={disabled}
            isSearchable={isSearchable}
            formatOptionLabel={(item: OptionType) => (
              <span
                className="countryName"
                style={{
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                }}
                onClick={() => {
                  console.log(item?.value);
                }}
              >
                <CurrencyFlagImage
                  currency={item?.value}
                  style={{
                    borderRadius: "999px",
                    marginRight: "1px",
                    width: "24px",
                    height: "24px",
                  }}
                  size="sm"
                />
                &nbsp;
                {item.label}
              </span>
            )}
            className={cn(
              `mt-2 w-full border-[#ffffff22] bg-[#ffffff22] text-gray-800 ${
                cutBorder ? "border-l-0 border-t-0 border-r-0" : "border"
              } rounded-full shadow-sm focus:ring focus:ring-orange-300`
            )}
            styles={{
              control: (base, { isFocused }) => ({
                ...base,
                background: "#ffffff22",
                padding: "0.35rem",
                borderColor:
                  meta.touched && meta.error ? "#E10000" : "#ffffff22",
                borderRadius: "999px",
                boxShadow: isFocused
                  ? "0 0 0 2px rgba(249, 167, 2, 0.2)"
                  : "none",
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
                backgroundColor: "#FD9563",
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
        )}
      </Field>
    </div>
  );
};

export default CountrySelect;
