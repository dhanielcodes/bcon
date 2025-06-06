"use client";
import ActionTabs from "@/components/agentTabs/ActionTabs";
import YourStatsTab from "@/components/agentTabs/YourStatsTab";
import Box from "@/components/bits/Box";
import ConversionRateInput from "@/components/ConversionRateInput";
import QuickSendTab from "@/components/QuickSendTab";
import RecentTransactionsTab from "@/components/RecentTransactionsTab";
import Topbar from "@/components/Topbar";
import MainContext, {
  ErrorContextType,
  useMainContext,
} from "@/context/global.context";
import { RateSelectType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { lazy, Suspense, useContext, useState } from "react";

const DashboardCard = lazy(() => import("@/components/DashboardCard"));
const BaseFilterTab = lazy(() => import("@/components/BaseFilterTab"));
const CountrySelect = lazy(() => import("@/components/CountrySelect"));

export default function Page() {
  const callToActions = [
    {
      title: "Record Payment",
      image: "/icons/send-icon.svg",
      route: "/customer/send-money",
    },
    {
      title: "Request Money",
      image: "/icons/receive-icon.svg",
      route: "/customer/send-money",
    },
    {
      title: "Payment Link",
      image: "/icons/payment-link-icon.svg",
      route: "/customer/profile/wallet",
    },
    {
      title: "My Rates",
      image: "/icons/my-rates-icon.svg",
      route: "/customer/explore",
    },
  ];

  const [val, setVal] = useState<{
    fromCurrency: RateSelectType;
    toCurrency: RateSelectType;
  }>({
    fromCurrency: { amount: 0, currency: "GBP" } as RateSelectType,
    toCurrency: { amount: 0, currency: "NGN" } as RateSelectType,
  });

  console.log(val, "whole rate conversion");
  const [active, setActive] = useState<string>("sent");
  const { isAuth } = useMainContext();

  console.log(isAuth, "isAuth");
  return (
    <div>
      <Topbar />
      <DashboardCard className="bg-[#7F56D9]">
        <CountrySelect className="w-[200px] mx-auto" />

        <div className="text-white text-center">
          <h4>You Have Sent</h4>
          <h1 className="text-3xl font-bold">
            <span className="text-sm">₦</span> 1,063.02
          </h1>
        </div>
      </DashboardCard>
      <div className="grid grid-cols-4 gap-4 text-[12px] mb-4">
        {callToActions.map((action, idx) => {
          return (
            <div key={idx}>
              <Link href={action.route}>
                <Box
                  key={action.title}
                  className="cursor-pointer text-center h-full mb-0 rounded-2xl py-5 px-2 text-primary-orange col-span-1 grid place-items-center"
                >
                  <Image src={action.image} alt="cta" width={26} height={26} />
                  <div>{action.title}</div>
                </Box>
              </Link>
            </div>
          );
        })}
      </div>
      <YourStatsTab />
      <Box className="rounded-3xl p-6">
        <h1 className="text-base mb-2">Today's Rates</h1>
        <ConversionRateInput
          onChange={(e) => {
            setVal(e);
          }}
          value={val}
        />
      </Box>
      <ActionTabs />
      <RecentTransactionsTab />
    </div>
  );
}
