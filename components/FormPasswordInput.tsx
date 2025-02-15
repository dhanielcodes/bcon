import { FC, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

interface FormPasswordInputProps {
  name: string;
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

const FormPasswordInput: FC<FormPasswordInputProps> = ({
  name,
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

  const [showPassword, setShowPassword] = useState<boolean>(false);

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
        <Field
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={max}
          className="w-full bg-transparent outline-none text-gray-800"
        />
        <div
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <EyeOpenIcon className="w-5 h-5 text-gray-500 ml-2" />
          ) : (
            <EyeClosedIcon className="w-5 h-5 text-gray-500 ml-2" />
          )}
        </div>
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
        <p className="text-white text-xs mt-1">1</p>
      )}
    </div>
  );
};

export default FormPasswordInput;
