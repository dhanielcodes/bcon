import React from "react";
import Image from "next/image";
import Box from "../bits/Box";
import Link from "next/link";

const ActionTabs = () => {
  return (
    <Box className="rounded-3xl p-6 grid grid-cols-2 space-x-4">
      <Link href="/agent-a/rates">
        <Image
          src="/images/update-rate.svg"
          className="w-full"
          width={200}
          height={200}
          alt="tab"
        />
      </Link>
      <Link href="/agent-a/profile/wallet">
        <Image
          src="/images/my-wallets.svg"
          className="w-full"
          width={200}
          height={200}
          alt="tab"
        />
      </Link>
    </Box>
  );
};

export default ActionTabs;
