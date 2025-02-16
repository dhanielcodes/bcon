"use client";
import Box from "@/components/bits/Box";
import AppButton from "@/components/Fields/AppButton";
import FormInput from "@/components/Fields/FormInput";
import FormPasswordInput from "@/components/Fields/FormPasswordInput";
import MainSelect from "@/components/Fields/MainSelect";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";

export default function Page() {
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

              <AppButton placeholder="Submit" />
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
