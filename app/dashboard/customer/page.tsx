"use client";
import Box from "@/components/bits/Box";
import { lazy } from "react";

const DashboardCard = lazy(() => import("@/components/DashboardCard"));

export default function Page() {
  return (
    <div>
      <DashboardCard></DashboardCard>
      <Box>
        <h1 className="text-2xl mb-2">Dashboard Customer</h1>
      </Box>
    </div>
  );
}
