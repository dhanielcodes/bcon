import Image from "next/image";
import { HTMLAttributes } from "react";

const BeneficiarySlip = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="border border-neutral bg-white px-4 py-3 space-x-2 rounded-2xl flex justify-between items-center"
      {...props}
    >
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
