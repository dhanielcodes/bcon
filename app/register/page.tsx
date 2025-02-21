"use client";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";
import { Onboard } from "./Onboard";
import Box from "@/components/bits/Box";
import Stepper from "@/components/Stepper";
import { useState } from "react";

export default function Page() {
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      <Box className="rounded-t-none">
        <div className="grid place-items-center">
          <Stepper steps={3} active={active} setActive={setActive} />
        </div>
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
            <Onboard.StepThreeComponent />
          </Form>
        )}
      </Formik>
    </div>
  );
}
