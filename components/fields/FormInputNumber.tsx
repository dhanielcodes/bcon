import { useFormikContext, Field, ErrorMessage } from "formik";
import { NumericFormat } from "react-number-format";
import getSymbolFromCurrency from "currency-symbol-map";

interface FormInputNumberProps {
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  label?: string;
  disabled?: boolean;
  width?: string;
  bottom?: string;
  required?: boolean;
  amount?: boolean;
  percent?: boolean;
  item?: React.ReactNode;
  max?: number;
  pin?: boolean;
  padding?: string;
  labelColor?: string;
  background?: string;
  IconRight?: React.FC<{ width: string; height: string }>;
  IconLeft?: React.FC<{ width: string; height: string }>;
  hint?: string;
  currency?: string;
  cutBorder?: boolean;
  showError?: boolean;
}

export default function FormInputNumber({
  name,
  placeholder,
  defaultValue,
  label,
  disabled,
  width = "100%",
  bottom = "0px",
  required = false,
  amount = false,
  percent = false,
  item,
  max,
  pin,
  labelColor = "#000",
  background = "#F6F8FA",
  IconRight,
  IconLeft,
  hint,
  currency,
  cutBorder,
  showError = true,
}: FormInputNumberProps) {
  const { setFieldValue, values, errors } = useFormikContext<{
    [key: string]: any;
  }>();

  const formatToNumber = (str: string) => {
    const cleanedStr = str.replace(/[^0-9.]/g, "");
    return parseFloat(cleanedStr);
  };

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
        className={`flex items-center rounded-md border mt-2 ${
          errors[name] ? "border-red-500" : "border-[#ECEFF3]"
        } bg-white shadow-sm focus-within:ring-2 focus-within:focus:ring-orange-200`}
        style={{
          borderRadius: cutBorder ? "0px 8px 8px 0px" : "8px",
          background,
          width,
          marginBottom: bottom,
        }}
      >
        {IconLeft && (
          <div className="pl-3">
            <IconLeft width="20px" height="20px" />
          </div>
        )}

        <Field name={name}>
          {({ field }: any) => (
            <NumericFormat
              {...field}
              className="w-full px-3 py-2 text-lg bg-transparent outline-none placeholder:text-[1rem]"
              allowLeadingZeros
              thousandSeparator={amount ? "," : ""}
              prefix={amount ? getSymbolFromCurrency(currency || "") : ""}
              suffix={percent ? "%" : ""}
              required={required}
              max={max}
              maxLength={max}
              defaultValue={defaultValue}
              value={values[name]}
              onChange={(e) =>
                setFieldValue(
                  name,
                  amount ? formatToNumber(e.target.value) : e.target.value
                )
              }
              placeholder={placeholder}
              disabled={disabled}
              type={pin ? "password" : "text"}
            />
          )}
        </Field>

        {IconRight && (
          <div className="pr-3">
            <IconRight width="20px" height="20px" />
          </div>
        )}
      </div>

      {showError ? (
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
}
