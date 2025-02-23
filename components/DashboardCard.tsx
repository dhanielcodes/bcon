import { cn } from "@/libs/utils";
import React, { FC, ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  className?: string;
}
const DashboardCard: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        `py-8 px-6 space-y-4 bg-primary-orange rounded-3xl mb-4 ${className}`
      )}
    >
      {children}
    </div>
  );
};

export default DashboardCard;
