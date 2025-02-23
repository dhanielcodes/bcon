"use client";
import { FC } from "react";
import Box from "./Box";
import BackBtn from "./BackBtn";
import { Form, Formik } from "formik";
import FormRegularInput from "@/components/fields/FormRegularInput";
import { Search } from "lucide-react";
import { cn } from "@/libs/utils";

interface Props {
  className?: string;
  icon?: any;
  title: string;
  showSearch?: boolean;
  showBackBtn?: boolean;
  space?: string;
}

const PageTitleSearchBox: FC<Props> = ({
  className,
  icon,
  title,
  showSearch = true,
  showBackBtn = false,
  space,
}) => {
  return (
    <>
      <Box
        className={cn(
          "rounded-t-none fixed top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[650px]",
          className
        )}
      >
        <div className="mb-4">{showBackBtn && <BackBtn />}</div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-medium">{title}</h1>
          {icon && icon}
        </div>
        {showSearch && (
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormRegularInput
                  IconLeft={Search}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-full"
                />
              </Form>
            )}
          </Formik>
        )}
      </Box>
      <div
        style={{
          marginBottom: space + "px",
        }}
      ></div>
    </>
  );
};

export default PageTitleSearchBox;
