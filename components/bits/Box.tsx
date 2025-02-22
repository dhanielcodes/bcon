import { cn } from "@/libs/utils";
import { FC } from "react";

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}

const Box: FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={cn(`p-5 bg-white rounded-[35px] mb-4`, className)}>
      {children}
    </div>
  );
};

export default Box;
