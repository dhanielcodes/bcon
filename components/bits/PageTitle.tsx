"use client";
import { FC } from "react";
import Box from "./Box";
import BackBtn from "./BackBtn";

interface Props {
  className?: string;
  icon?: any;
  title: string;
  space?: string;
}

const PageTitle: FC<Props> = ({ className, icon, title, space }) => {
  return (
    <>
      <Box className="rounded-t-none flex justify-between items-center fixed top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[650px]">
        <BackBtn />
        <h1 className="text-base">{title}</h1>
        {icon && icon}
      </Box>
      <div
        style={{
          marginBottom: space + "px",
        }}
      ></div>
    </>
  );
};

export default PageTitle;
