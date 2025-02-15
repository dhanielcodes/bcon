"use client";
import AppButton from "@/components/AppButton";
import FormInput from "@/components/FormInput";
import FormPasswordInput from "@/components/FormPasswordInput";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";

export default function Page() {
  return (
    <div className="p-4">
      <div>BCON Playground</div>
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
    </div>
  );
}
