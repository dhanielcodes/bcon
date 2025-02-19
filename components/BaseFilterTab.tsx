"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FC } from "react";

interface TabItem {
  tab: string;
  name: string;
}

interface BaseFilterTabProps {
  tab: TabItem[];
}

const BaseFilterTab: FC<BaseFilterTabProps> = ({ tab }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const addQueryParams = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", query);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const active = searchParams.get("tab");

  return (
    <div className="w-full flex gap-2 p-1 bg-light-orange rounded-full">
      {tab.map((item) => (
        <div
          key={item.tab}
          onClick={() => addQueryParams(item.tab)}
          className={`px-4 w-full py-3 text-white text-center rounded-full cursor-pointer text-sm transition-all 
            ${active === item.tab ? "bg-primary-orange" : "bg-transparent"}`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default BaseFilterTab;
