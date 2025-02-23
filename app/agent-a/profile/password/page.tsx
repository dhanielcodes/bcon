"use client";
import Box from "@/components/bits/Box";
import PageTitle from "@/components/bits/PageTitle";
import FormPasswordInput from "@/components/fields/FormPasswordInput";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { FC, lazy } from "react";

const AppButton = lazy(() => import("@/components/fields/AppButton"));

export default function Page() {
  return (
    <div>
      <PageTitle space="80" title="Change Password" icon={<div></div>} />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box>
              <FormPasswordInput
                label="Old Password"
                name="old_password"
                placeholder="Enter your email"
              />
              <FormPasswordInput
                label="NewPassword"
                name="new_password"
                placeholder="Enter your email"
              />
            </Box>
            <Box>
              <AppButton placeholder="Submit" className="mt-0" />
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const Tab: FC<{
  title?: string;
  icon?: string;
  route?: string;
}> = ({ title, icon, route }) => {
  return (
    <div>
      <Link href={`/${route}`}>
        <div className="py-3 space-x-2 rounded-3xl flex justify-between items-center">
          <Image alt="pdf" width={50} height={50} src={`/${icon}`} />
          <div className="flex w-full items-center justify-between text-sm">
            <div className="text-sm font-medium">{title}</div>
            <div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.91997 14.0072C5.24664 14.3339 5.77331 14.3339 6.09997 14.0072L11.64 8.46719C11.9 8.20719 11.9 7.78719 11.64 7.52719L6.09997 1.98719C5.77331 1.66052 5.24664 1.66052 4.91997 1.98719C4.59331 2.31385 4.59331 2.84052 4.91997 3.16719L9.74664 8.00052L4.91331 12.8339C4.59331 13.1539 4.59331 13.6872 4.91997 14.0072Z"
                  fill="#98A2B3"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
