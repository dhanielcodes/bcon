import React, { FC, lazy } from "react";

const BaseFilterTab = lazy(() => import("@/components/BaseFilterTab"));
const DashboardCard: FC = () => {
  return (
    <div className="p-6 bg-primary-orange rounded-3xl mb-4">
      <BaseFilterTab
        tab={[
          { name: "Sent", tab: "sent" },
          { name: "Received", tab: "received" },
        ]}
      />
    </div>
  );
};

export default DashboardCard;
