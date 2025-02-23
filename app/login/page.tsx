"use client";
import useLogin from "@/hooks/login";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";
import Link from "next/link";
import { lazy } from "react";

const AppButton = lazy(() => import("@/components/fields/AppButton"));
const FormInput = lazy(() => import("@/components/fields/FormInput"));
const FormPasswordInput = lazy(
  () => import("@/components/fields/FormPasswordInput")
);
const Box = lazy(() => import("@/components/bits/Box"));

export default function Page() {
  const { mutate, isPending } = useLogin();

  return (
    <div>
      <Box>
        <h1 className="text-2xl mb-2">Sign in</h1>
        <p className="text-sm">Welcome back.</p>
      </Box>
      <Box>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
            mutate(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormInput
                label="Email/Phone Number"
                name="email"
                type="email"
                hint="Email Address eg.xx@x.com"
                placeholder="Enter your email"
                width="w-[510px]"
              />
              <FormPasswordInput
                label="Password"
                name="password"
                placeholder="Enter your email"
                width="w-[510px]"
              />

              <AppButton placeholder="Submit" loading={isPending} />
            </Form>
          )}
        </Formik>
        <div className="text-center my-4">
          Don’t have an account?{" "}
          <Link className="text-secondary-orange underline" href={"/register"}>
            Sign up
          </Link>
        </div>
      </Box>
    </div>
  );
}
