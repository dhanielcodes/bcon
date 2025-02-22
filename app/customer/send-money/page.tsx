"use client";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";
import { Send } from "./Send";
import Box from "@/components/bits/Box";
import Stepper from "@/components/Stepper";
import { useState } from "react";
import BackBtn from "@/components/bits/BackBtn";

export default function Page() {
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      <Box className="rounded-t-none flex justify-between items-center">
        <BackBtn />
        <div className="grid place-items-center w-1/2">
          <Stepper steps={3} active={active} setActive={setActive} />
        </div>
        <div></div>
      </Box>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {active === 1 && <Send.StepOneComponent />}
            {active === 2 && <Send.StepTwoComponent />}
            {active === 3 && <Send.StepThreeComponent />}
          </Form>
        )}
      </Formik>
    </div>
  );
}
