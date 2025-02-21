import { FC } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";

interface AppButtonProps {
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

const AppButton: FC<AppButtonProps> = ({
  onClick,
  placeholder,
  loading,
  disabled,
  outline,
  secondary,
  showBorder = true,
  borderColor,
  style,
  IconLeft,
  IconRight,
  to,
  width = "w-full",
  roundedFull,
  radius,
  textColor = "#000",
  borderWidth = 1,
  className,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (to) router.push(to);
    if (onClick) onClick();
  };

  const buttonClasses = cn(
    "flex items-center justify-center gap-2 py-3 px-4 font-semibold text-sm transition-all mt-3",
    disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
    outline
      ? `border ${
          showBorder ? `border-[${borderColor || "#D0D5DD"}]` : "border-none"
        } bg-transparent`
      : secondary
      ? "bg-white text-black"
      : `bg-primary-orange text-white`,
    roundedFull
      ? "rounded-full"
      : radius
      ? `rounded-[${radius}]`
      : "rounded-lg",
    width,
    className
  );

  return (
    <button
      className={buttonClasses}
      style={style}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {IconLeft && <IconLeft className="w-4 h-4" color={textColor} />}
          {placeholder}
          {IconRight && <IconRight className="w-4 h-4" color={textColor} />}
        </>
      )}
    </button>
  );
};

const Spinner = () => (
  <div className="animate-spin w-5 h-5 border-2 border-t-secondary-orange border-gray-300 rounded-full" />
);

export default AppButton;
