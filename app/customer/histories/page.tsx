"use client";
import Box from "@/components/bits/Box";
import PageTitleSearchBox from "@/components/bits/PageTitleSearchBox";
import { ListFilter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <PageTitleSearchBox
        title="History"
        icon={<ListFilter color="#667085" width={24} height={24} />}
        space="130"
      />

      <Box className="space-y-4">
        {Array(12)
          .fill(3)
          .map((_, idx) => {
            return (
              <div>
                <Link href={`/customer/history?id=${idx}`}>
                  <Slip />
                </Link>
              </div>
            );
          })}
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
          <div className="text-green-500 text-sm">Success</div>
        </div>
      </div>
    </div>
  );
};
