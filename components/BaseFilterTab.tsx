"use client";
import { BaseFilterTabProps } from "@/types/types";
import { FC } from "react";

const BaseFilterTab: FC<BaseFilterTabProps> = ({
  tab,
  active = "",
  setActive,
}) => {
  return (
    <div className="w-full flex gap-2 p-1 bg-white bg-opacity-30 rounded-full">
      {tab.map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            if (setActive) {
              setActive(item.tab);
            }
          }}
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
