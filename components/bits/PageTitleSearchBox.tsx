"use client";
import { FC } from "react";
import Box from "./Box";
import BackBtn from "./BackBtn";
import { Form, Formik } from "formik";
import FormRegularInput from "../fields/FormRegularInput";
import { BellIcon } from "@radix-ui/react-icons";

interface Props {
  className?: string;
  icon?: any;
  title: string;
}

const PageTitleSearchBox: FC<Props> = ({ className, icon, title }) => {
  return (
    <Box className="rounded-t-none fixed top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[390px]">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">{title}</h1>
        {icon && icon}
      </div>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormRegularInput
              IconLeft={BellIcon}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="rounded-full"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PageTitleSearchBox;
