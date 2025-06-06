"use client";
import Box from "@/components/bits/Box";
import PageTitle from "@/components/bits/PageTitle";
import WalletCard from "@/components/WalletCard";
import Image from "next/image";
import { lazy } from "react";

const AppButton = lazy(() => import("@/components/fields/AppButton"));

export default function Page() {
  return (
    <div>
      <PageTitle space="40" title="GBP Wallet" icon={<div></div>} />
      <WalletCard />
      <Box className="rounded-3xl p-6">
        <h1 className="text-base mb-4">Recent Transactions</h1>
        <div className="space-y-4">
          {Array(3)
            .fill(3)
            .map((_, idx) => {
              return <Slip key={idx} />;
            })}
        </div>
      </Box>
    </div>
  );
}

const Slip = () => {
  return (
    <div className="bg-neutral2 px-4 py-3 space-x-2 rounded-3xl flex justify-between items-center">
      <Image alt="pdf" width={50} height={50} src="/icons/pdf-icon.svg" />
      <div className="flex w-full items-center justify-between text-sm">
        <div className="text-left space-y-2">
          <div>Femi Falana</div>
          <div className="text-sm text-neutral3">03-02-2025</div>
        </div>
        <div className="text-right space-y-2">
          <div className="text-lg ">£25</div>
          <div className="text-neutral3">₦25,829</div>
        </div>
      </div>
    </div>
  );
};
