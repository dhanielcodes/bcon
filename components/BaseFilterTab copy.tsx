"use client";

import { BaseFilterTabProps } from "@/types/types";
import { useSearchParams, useRouter } from "next/navigation";
import { FC } from "react";

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
    <div className="w-full flex gap-2 p-1 bg-white bg-opacity-30 rounded-full">
      {tab.map((item, idx) => (
        <div
          key={idx}
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
