import React, { FC, lazy, ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
}
const DashboardCard: FC<CardProps> = ({ children }) => {
  return (
    <div className="p-6 bg-primary-orange rounded-3xl mb-4">{children}</div>
  );
};

export default DashboardCard;
