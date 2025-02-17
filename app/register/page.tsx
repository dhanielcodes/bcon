"use client";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";
import { Onboard } from "./Onboard";

export default function Page() {
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Onboard.StepThreeComponent />
          </Form>
        )}
      </Formik>
    </div>
  );
}
