"use client";
import Box from "@/components/bits/Box";
import PageTitleSearchBox from "@/components/bits/PageTitleSearchBox";
import { ListFilter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CurrencyFlagImage from "react-currency-flags";

export default function Page() {
  return (
    <div>
      <PageTitleSearchBox
        title="Wallet"
        space="100"
        showSearch={false}
        showBackBtn
        icon={
          <div className="flex space-x-2">
            <Image
              src="/icons/add-wallet.svg"
              alt="al"
              width={18}
              height={18}
            />

            <div className="text-primary-orange text-sm">New Wallet</div>
          </div>
        }
      />

      <Box className="grid grid-cols-2 gap-4">
        {Array(4)
          .fill(1)
          .map((itm) => {
            return (
              <Link href="/customer/profile/wallet/gbp">
                <Card />
              </Link>
            );
          })}
      </Box>
    </div>
  );
}

const Card = () => {
  return (
    <div className="border border-primary-orange cursor-pointer p-4 space-y-2 rounded-2xl">
      <CurrencyFlagImage
        currency="GBP"
        className="rounded-full mr-1"
        style={{ width: "28px", height: "28px" }}
      />
      <div>
        <div className="text-base ">GBP</div>
        <div className="text-sm ">£25</div>
      </div>
    </div>
  );
};
