import React from "react";
import Box from "./bits/Box";
import Image from "next/image";
import { cn } from "@/libs/utils";

const RecentTransactionsTab = () => {
  return (
    <Box className="rounded-3xl p-6">
      <h1 className="text-base mb-4">Recent Transactions</h1>
      <div className="space-y-4">
        {Array(3)
          .fill(3)
          .map((_, idx) => {
            return <Slip />;
          })}
      </div>
    </Box>
  );
};

const Slip = () => {
  return (
    <div className="bg-neutral p-4 rounded-3xl flex justify-between items-center">
      <Image alt="pdf" width={50} height={50} src="/icons/pdf-icon.svg" />
    </div>
  );
};

export default RecentTransactionsTab;
