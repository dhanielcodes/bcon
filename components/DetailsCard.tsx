import { cn } from "@/libs/utils";
import { HTMLAttributes } from "react";

type DetailType = {
  title: string;
  value: string;
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  details?: DetailType[];
}

const DetailsCard = ({
  title = "Personal details",
  details = [],
  ...props
}: Props) => {
  return (
    <div className="space-y-2" {...props}>
      {title && <h4 className="font-medium">{title}</h4>}

      <div className="border border-neutral bg-white p-2 rounded-2xl">
        {details.map((detail, idx) => {
          return (
            <div
              className={cn(
                "flex justify-between w-full px-4 py-3 border-neutral",
                `${details.length === idx + 1 ? "" : "border-b"}`
              )}
            >
              <div className="text-neutral3">{detail.title}</div>
              <div>{detail.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsCard;
