import { cn } from "@/libs/utils";
import { FC } from "react";

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}

const Box: FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={cn(`p-4 bg-white rounded-2xl`, className)}>{children}</div>
  );
};

export default Box;
