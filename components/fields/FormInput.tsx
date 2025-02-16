import { FC } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

interface FormInputProps {
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  label?: string;
  disabled?: boolean;
  width?: string;
  labelColor?: string;
  background?: string;
  required?: boolean;
  max?: number;
  IconRight?: React.ElementType;
  IconLeft?: React.ElementType;
  hint?: string;
}

const FormInput: FC<FormInputProps> = ({
  name,
  type,
  placeholder,
  defaultValue,
  label,
  disabled,
  width = "w-full",
  labelColor = "text-black",
  background = "bg-[#F6F8FA]",
  required = false,
  max,
  IconRight,
  IconLeft,
  hint,
}) => {
  const { errors } = useFormikContext<any>(); // Access Formik's context

  const hasError = errors[name]; // Determine if an error is present

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
      <div
        className={`relative flex items-center ${background} border rounded-lg p-3 mt-2 ${
          hasError ? "border-red-500" : "border-[#ECEFF3]"
        }`}
      >
        {IconLeft && <IconLeft className="w-5 h-5 text-gray-500 mr-2" />}
        <Field
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={max}
          className="w-full bg-transparent outline-none text-gray-800"
          onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => {
            if (type === "number") {
              ["e", "E", "+", "-", "=", "(", ")", "*", "&"].includes(evt.key) &&
                evt.preventDefault();
            }
          }}
        />
        {IconRight && <IconRight className="w-5 h-5 text-gray-500 ml-2" />}
      </div>
      {hasError ? (
        <ErrorMessage
          name={name}
          component="p"
          className="text-red-500 text-xs flex items-center mt-1"
        />
      ) : hint ? (
        <p className="text-gray-500 text-xs mt-1">{hint}</p>
      ) : (
        <p className="text-transparent text-xs mt-1">full</p>
      )}
    </div>
  );
};

export default FormInput;
