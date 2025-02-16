import { cn } from "@/libs/utils";
import { FC } from "react";

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}

const Box: FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={cn(`p-6 bg-white rounded-2xl mb-4`, className)}>
      {children}
    </div>
  );
};

export default Box;
