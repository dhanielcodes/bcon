import { cn } from "@/libs/utils";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const BeneficiarySlip: FC<Props> = ({ active, ...props }) => {
  return (
    <div
      className={cn(
        "relative border cursor-pointer bg-white px-4 py-3 space-x-2 rounded-2xl flex justify-between items-center",
        active ? "border-primary-orange" : "border-neutral"
      )}
      {...props}
    >
      {active && (
        <svg
          className="absolute right-0 top-0"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.466535"
            y="0.466535"
            width="15.0669"
            height="15.0669"
            rx="6.99803"
            fill="#FF7434"
          />
          <rect
            x="0.466535"
            y="0.466535"
            width="15.0669"
            height="15.0669"
            rx="6.99803"
            stroke="#FF7434"
            stroke-width="0.933071"
          />
          <path
            d="M11.1104 5.66748L6.83379 9.94406L4.88989 8.00016"
            stroke="white"
            stroke-width="1.55512"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}

      <Image
        alt="pdf"
        width={30}
        height={30}
        src="/icons/profile.png"
        className="rounded-full"
      />
      <div className="flex w-full items-center justify-between text-sm">
        <div className="text-left space-y-1">
          <div>Femi Falana</div>
          <div className="text-sm text-neutral3">Access Bank</div>
        </div>
        <div className="text-lg ">••••3929</div>
      </div>
    </div>
  );
};

export default BeneficiarySlip;
