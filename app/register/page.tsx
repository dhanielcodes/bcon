"use client";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";
import { lazy } from "react";

const Box = lazy(() => import("@/components/bits/Box"));

const FormInput = lazy(() => import("@/components/Fields/FormInput"));
const FormPasswordInput = lazy(
  () => import("@/components/Fields/FormPasswordInput")
);
const FormInputNumber = lazy(
  () => import("@/components/Fields/FormInputNumber")
);
const MainSelect = lazy(() => import("@/components/Fields/MainSelect"));
const AppButton = lazy(() => import("@/components/Fields/AppButton"));

export default function Page() {
  return (
    <div>
      <Box>
        <h1 className="text-2xl mb-2">What's Your Email Address</h1>
        <p className="text-sm">Please enter your details</p>
      </Box>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box>
              <MainSelect
                name="type"
                placeholder="Select Account Type"
                label="Account Type"
                options={[
                  { label: "Customer", value: "customer" },
                  { label: "Agent", value: "agent" },
                ]}
              />
              <FormInput
                label="Email/Phone Number"
                name="email"
                type="email"
                placeholder="Enter your email"
                width="w-[510px]"
              />
              <FormPasswordInput
                label="Password"
                name="password"
                placeholder="Enter your email"
                width="w-[510px]"
              />
              <FormInput
                label="Invite Code"
                name="code"
                type="text"
                placeholder="Enter code"
                width="w-[510px]"
              />
              {/*   <FormInputNumber
                label="Invite Code"
                name="code"
                placeholder="Enter code"
                width="w-[510px]"
              /> */}
            </Box>
            <Box>
              <AppButton placeholder="Submit" />
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}
