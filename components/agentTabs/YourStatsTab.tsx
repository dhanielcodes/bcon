import React from "react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import Box from "../bits/Box";

const YourStatsTab = () => {
  return (
    <Box className="rounded-3xl p-6">
      <h1 className="text-base mb-4">Your Stats</h1>
      <div className="grid grid-cols-2">
        {Array(4)
          .fill(3)
          .map((_, idx) => {
            return (
              <div
                key={idx}
                className={cn(
                  "py-4 cursor-pointer flex items-start space-x-2",
                  `${
                    idx === 0
                      ? "border-r border-b"
                      : idx === 3
                      ? "border-none pl-4"
                      : idx === 1
                      ? "border-b pl-4"
                      : "border-r"
                  }`
                )}
              >
                <Image
                  src="/icons/profile.png"
                  width={44}
                  height={44}
                  alt="profile"
                />

                <div>
                  <div className="text-[#98A2B3] text-sm">
                    Total Transactions
                  </div>
                  <h1 className="text-base mt-1">34,709</h1>
                </div>
              </div>
            );
          })}
      </div>
    </Box>
  );
};

export default YourStatsTab;
