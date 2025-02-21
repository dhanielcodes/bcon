"use client";
import { cn } from "@/libs/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  className?: string;
}

const BackBtn: FC<Props> = ({ className }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.back();
      }}
      className={cn("cursor-pointer", className)}
    >
      <ArrowLeftIcon width={20} height={20} />
    </div>
  );
};

export default BackBtn;
