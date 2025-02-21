import { cn } from "@/libs/utils";
import React, { Dispatch, FC, SetStateAction } from "react";

type StepperProp = {
  steps?: number;
  containerClassName?: string;
  stepClassName?: string;
  containerWidth?: number | string;
  dotSize?: number | string;
  active?: number;
  setActive?: Dispatch<SetStateAction<number>>;
};

const Stepper: FC<StepperProp> = ({
  steps = 1,
  containerClassName,
  stepClassName,
  containerWidth = "100%",
  dotSize = 16,
  active = 1,
  setActive,
}) => {
  return (
    <div
      style={{
        width: containerWidth,
      }}
      className={cn(
        "flex relative items-center justify-between",
        "after:absolute left-0 after:content-[''] after:w-full after:h-[1px] after:inline-block after:bg-[#E9E9E9]",
        containerClassName
      )}
    >
      {Array(steps)
        .fill(1)
        .map((_, index: number) => {
          return (
            <div
              key={index}
              style={{
                width: dotSize,
                height: dotSize,
              }}
              onClick={() => {
                if (setActive) setActive(index + 1);
              }}
              className={cn(
                `flex w-full items-center justify-center rounded-full z-10 border `,
                `${
                  active >= index + 1
                    ? " border-primary-orange"
                    : " border-[#F0EFEF] bg-white"
                }`,
                stepClassName
              )}
            >
              {active >= index + 1 && (
                <div
                  style={{
                    width: "50%",
                    height: "50%",
                  }}
                  className={cn(
                    `rounded-full text-sm relative bg-primary-orange`
                  )}
                ></div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Stepper;
