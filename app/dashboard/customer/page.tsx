"use client";
import Box from "@/components/bits/Box";
import Image from "next/image";
import { lazy, useState } from "react";

const DashboardCard = lazy(() => import("@/components/DashboardCard"));
const BaseFilterTab = lazy(() => import("@/components/BaseFilterTab"));
const CountrySelect = lazy(() => import("@/components/CountrySelect"));
const RateInput = lazy(() => import("@/components/RateInput"));

export default function Page() {
  const callToActions = [
    {
      title: "Send",
      image: "/icons/send-icon.svg",
      route: "/dashboard/send",
    },
    {
      title: "Receive",
      image: "/icons/receive-icon.svg",
      route: "/dashboard/send",
    },
    {
      title: "Wallet",
      image: "/icons/wallet-icon.svg",
      route: "/dashboard/send",
    },
    {
      title: "Explore",
      image: "/icons/explore-icon.svg",
      route: "/dashboard/send",
    },
  ];
  const [value, setValue] = useState<{
    amount: number;
    currency: string;
  }>({ amount: 0, currency: "GBP" });
  return (
    <div>
      <DashboardCard>
        <BaseFilterTab
          tab={[
            { name: "Sent", tab: "sent" },
            { name: "Received", tab: "received" },
          ]}
        />
        <CountrySelect className="w-[200px] mx-auto" />

        <div className="text-white text-center">
          <h4>You Have Sent</h4>
          <h1 className="text-3xl font-bold">
            <span className="text-sm">₦</span> 1,063.02
          </h1>
        </div>
      </DashboardCard>
      <div className="grid grid-cols-4 gap-4 text-[12px]">
        {callToActions.map((action) => {
          return (
            <Box
              key={action.title}
              className="cursor-pointer py-5 px-2 text-primary-orange col-span-1 grid place-items-center"
            >
              <Image src={action.image} alt="cta" width={26} height={26} />
              <div>{action.title}</div>
            </Box>
          );
        })}
      </div>
      <Box className="rounded-3xl p-6">
        <h1 className="text-base mb-2">Today's Rates</h1>
        <RateInput
          onChange={(e) => {
            console.log(e, "rate in");
            setValue(e);
          }}
          value={value}
        />
        <br />
        <RateInput
          title="Receiver gets"
          onChange={(e) => {
            console.log(e, "rate in");
            setValue(e);
          }}
          value={value}
        />
      </Box>
    </div>
  );
}
