import { FC } from "react";
import Select from "react-select";
import { Field, FieldProps, useField } from "formik";
import { cn } from "@/libs/utils";
import { MainSelectProps } from "@/types/form-types";

const MainSelect: FC<MainSelectProps> = ({
  label,
  labelColor = "text-black",
  name,
  options,
  placeholder = "Select an option...",
  isSearchable = true,
  hint,
  disabled = false,
  cutBorder = false,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="w-full mb-3">
      {label && (
        <label
          htmlFor={name}
          className={`block text-[#344054] text-sm font-medium ${labelColor}`}
        >
          {label}
        </label>
      )}

      <Field name={name}>
        {({ field }: FieldProps) => (
          <Select
            id={name}
            name={field.name}
            value={
              options?.find((option) => option.value === field.value) || null
            }
            options={options}
            onChange={(selectedOption) => {
              helpers.setValue(selectedOption ? selectedOption.value : "");
              if (onChange) onChange(selectedOption);
            }}
            onBlur={field.onBlur}
            placeholder={placeholder}
            isDisabled={disabled}
            isSearchable={isSearchable}
            className={cn(
              `mt-2 w-full bg-[#F6F8FA] text-gray-800 ${
                cutBorder ? "border-l-0 border-t-0 border-r-0" : "border"
              } rounded-lg shadow-sm focus:ring focus:ring-orange-300`
            )}
            styles={{
              control: (base, { isFocused }) => ({
                ...base,
                background: "#F6F8FA",
                padding: "0.25rem",
                borderColor: meta.touched && meta.error ? "#E10000" : "#ECEFF3",
                borderRadius: "0.5rem",
                boxShadow: isFocused
                  ? "0 0 0 2px rgba(249, 167, 2, 0.2)"
                  : "none",
                "&:hover": {
                  borderColor: "#f9a702",
                },
              }),
            }}
          />
        )}
      </Field>

      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs mt-1 flex items-center">
          {meta.error}
        </p>
      ) : hint ? (
        <p className="text-gray-500 text-xs mt-1">{hint}</p>
      ) : (
        <p className="text-transparent text-xs mt-1">full</p>
      )}
    </div>
  );
};

export default MainSelect;
