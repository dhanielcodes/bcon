"use client";
import { LoginSchema } from "@/Schema";
import { Form, Formik } from "formik";
import { Onboard } from "./Onboard";
import Box from "@/components/bits/Box";
import Stepper from "@/components/Stepper";
import { useEffect, useState } from "react";
import { stepOneSchema, stepThreeSchema, stepTwoSchema } from "./validation";
import useSignUp from "@/hooks/signUp";
import { useParams } from "next/navigation";
import BconSeo from "@/components/BconSeo";

export default function Page() {
  const [active, setActive] = useState<number>(1);
  const { mutate, isPending, data } = useSignUp();
  const params = useParams();

  useEffect(() => {
    setActive(1);
  }, [data]);

  const id = (params?.id as string)?.toLowerCase() || null;
  return (
    <div>
      <BconSeo title={`Register Under Marketer - ${id}`} />
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
          agentId: id,
          code: "",
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
          if (active === 3) {
            const { code, agentId, accountType, ...restValues } = values;
            const payload = {
              ...restValues,
              accountType: Number(accountType),
              agentId: agentId ? Number(agentId) : 0,
              phone:
                values?.phone?.length === 11
                  ? values?.code + values?.phone?.slice(1, 11)
                  : values?.code + values?.phone,
            };

            mutate(payload);
          } else {
            setActive((curr) => curr + 1);
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {active === 1 && <Onboard.StepOneComponent />}
            {active === 2 && (
              <Onboard.StepTwoComponent
                values={values}
                setFieldValue={setFieldValue}
              />
            )}
            {active === 3 && (
              <Onboard.StepThreeComponent
                values={values}
                setFieldValue={setFieldValue}
                isPending={isPending}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
