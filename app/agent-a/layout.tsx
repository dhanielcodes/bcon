"use client"; // Layout must be a client component
import "@/app/globals.css";
import AgentAMenuBar from "@/components/navbars/AgentAMenuBar";
import WithRoleGuard from "@/HOC/WithRoleGuard";
import type { Metadata } from "next";

/* export const metadata: Metadata = {
  title: "Dashboard | BCON",
  description: "Your BCON account, start transacting",
};
 */
import { FC } from "react";

const DashboardLayout: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {children}
      <AgentAMenuBar />
    </div>
  );
};

export default WithRoleGuard(DashboardLayout, ["agent"]);
