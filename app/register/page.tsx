"use client";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";
import { Onboard } from "./Onboard";
import Box from "@/components/bits/Box";
import Stepper from "@/components/Stepper";
import { useState } from "react";
import { stepOneSchema, stepThreeSchema, stepTwoSchema } from "./validation";
import useSignUp from "@/hooks/signUp";

export default function Page() {
  const [active, setActive] = useState<number>(2);
  const { mutate, isPending } = useSignUp();

  return (
    <div>
      <Box className="rounded-t-none">
        <div className="grid place-items-center">
          <Stepper steps={3} active={active} setActive={setActive} />
        </div>
      </Box>
      <Formik
        initialValues={{
          accountType: "",
          //"businessCertificateURL": "UPLOADED FILE URL",
          firstName: "",
          surName: "",
          email: "",
          password: "",
          dob: "",
          gender: "",
          phone: "",
          address: "",
          //"postcode": "",
          country: {
            id: "",
          },
          state: {
            id: "",
          },
          city: {
            id: "",
          },
          employmentStatusId: "",
          profession: {
            id: "",
            name: "",
          },
          //"companyName": "WellFed",
          onboardingSource: "Web",
          //"deviceId": "Tets",
          agentId: 0,
        }}
        validationSchema={
          active === 1
            ? stepOneSchema
            : active === 2
            ? stepTwoSchema
            : stepThreeSchema
        }
        onSubmit={(values) => {
          console.log(values, "values");
          if (active == 3) {
            mutate(values);
          } else {
            setActive((curr) => curr + 1);
          }
        }}
      >
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            {active === 1 && <Onboard.StepOneComponent />}
            {active === 2 && <Onboard.StepTwoComponent values={values} />}
            {active === 3 && <Onboard.StepThreeComponent values={values} />}
          </Form>
        )}
      </Formik>
    </div>
  );
}
