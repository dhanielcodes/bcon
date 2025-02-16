"use client";
import AppButton from "@/components/Fields/AppButton";
import FormInput from "@/components/Fields/FormInput";
import FormPasswordInput from "@/components/Fields/FormPasswordInput";
import MainSelect from "@/components/Fields/MainSelect";
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
            <MainSelect
              name="password"
              placeholder="Hiii"
              label="Hello"
              options={[{ label: "hi", value: "hello" }]}
            />
            <AppButton placeholder="Submit" />
            <br />
            <AppButton secondary placeholder="Submit" />
            <br />
            <AppButton outline placeholder="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
