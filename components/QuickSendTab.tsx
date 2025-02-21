import React from "react";
import Box from "./bits/Box";
import Image from "next/image";
import { cn } from "@/libs/utils";

const QuickSendTab = () => {
  return (
    <Box className="rounded-3xl p-6">
      <h1 className="text-base mb-4">Quick Send</h1>
      <div className="grid grid-cols-2">
        {Array(3)
          .fill(3)
          .map((_, idx) => {
            return (
              <div
                className={cn(
                  "py-4 cursor-pointer",
                  `${
                    idx === 0
                      ? "border-r border-b"
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

                <h1 className="text-base mt-1">Michael Scofield</h1>
                <div className="text-[#98A2B3] my-2 text-sm">****6233</div>
                <div className="text-[#98A2B3] text-sm">Access Bank</div>
              </div>
            );
          })}
        <div className={cn("pl-4 pt-4 cursor-pointer")}>
          <Image src="/icons/add-icon.svg" width={44} height={44} alt="add  " />
          <h1 className="text-base mt-1">Add New</h1>
        </div>
      </div>
    </Box>
  );
};

export default QuickSendTab;
