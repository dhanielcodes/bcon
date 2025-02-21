"use client";
import BeneficiarySlip from "@/components/BeneficiarySlip";
import Box from "@/components/bits/Box";
import FormRegularInput from "@/components/fields/FormRegularInput";
import { BellIcon } from "@radix-ui/react-icons";
import { Form, Formik } from "formik";

export default function Page() {
  return (
    <div>
      <Box className="rounded-t-none fixed top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[390px]">
        <h1 className="text-2xl mb-2">Beneficiaries</h1>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormRegularInput
                IconLeft={BellIcon}
                name="email"
                type="email"
                placeholder="Enter your email"
                className="rounded-full"
              />
            </Form>
          )}
        </Formik>
      </Box>

      <Box className="space-y-4">
        {Array(12)
          .fill(3)
          .map((_, idx) => {
            return <BeneficiarySlip />;
          })}
      </Box>
    </div>
  );
}
