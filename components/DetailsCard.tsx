import { cn } from "@/libs/utils";
import { DetailsCardProps } from "@/types/types";
import { FC } from "react";

const DetailsCard: FC<DetailsCardProps> = ({
  title = "Personal details",
  details = [],
  ...props
}) => {
  return (
    <div className="space-y-2" {...props}>
      {title && <h4 className="font-medium">{title}</h4>}

      <div className="border border-neutral bg-white p-2 rounded-2xl">
        {details.map((detail, idx) => {
          return (
            <div
              key={idx}
              className={cn(
                "flex justify-between w-full px-4 py-3 border-neutral",
                `${details.length === idx + 1 ? "" : "border-b"}`
              )}
            >
              <div className="text-neutral3">{detail.title}</div>
              <div className="text-right">{detail.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsCard;
