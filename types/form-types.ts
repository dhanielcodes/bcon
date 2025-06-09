export interface AppButtonProps {
  onClick?: () => void;
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
  outline?: boolean;
  secondary?: boolean;
  showBorder?: boolean;
  color?: string;
  borderColor?: string;
  style?: React.CSSProperties;
  IconLeft?: React.ElementType;
  IconRight?: React.ElementType;
  to?: string;
  width?: string;
  roundedFull?: boolean;
  radius?: string;
  textColor?: string;
  borderWidth?: number;
  className?: string;
}

export interface FormInputProps {
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

export interface FormInputNumberProps {
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

export interface FormPasswordInputProps {
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

export interface OptionType {
  value: string | number;
  label: string;
}

export interface MainSelectProps {
  label?: string;
  labelColor?: string;
  name: string;
  options: OptionType[];
  placeholder?: string;
  isSearchable?: boolean;
  hint?: string;
  disabled?: boolean;
  cutBorder?: boolean;
  onChange?: (selected: OptionType | null) => void;
}

export interface CountrySelectProps {
  isSearchable?: boolean;
  className?: string;
  disabled?: boolean;
  cutBorder?: boolean;
  onChange?: (selected: OptionType | null) => void;
}

export interface CurrencySelectProps {
  isSearchable?: boolean;
  className?: string;
  disabled?: boolean;
  onChange?: (selected: OptionType | null) => void;
  value?: OptionType | null;
  excludeId?: any;
}
