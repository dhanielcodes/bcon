import { FC } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { cn } from "@/libs/utils";

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
  className?: string;
}

const FormRegularInput: FC<FormInputProps> = ({
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
  className,
}) => {
  const { errors } = useFormikContext<any>(); // Access Formik's context

  const hasError = errors[name]; // Determine if an error is present

  return (
    <div className="w-full">
      <div
        className={cn(
          `relative flex items-center ${background} border rounded-lg p-3 ${
            hasError ? "border-red-500" : "border-[#ECEFF3]"
          } focus-within:ring-2 focus-within:focus:ring-orange-200`,
          className
        )}
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
    </div>
  );
};

export default FormRegularInput;
