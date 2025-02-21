"use client";
import BeneficiarySlip from "@/components/BeneficiarySlip";
import Box from "@/components/bits/Box";
import PageTitleSearchBox from "@/components/bits/PageTitleSearchBox";
import FormRegularInput from "@/components/fields/FormRegularInput";
import { BellIcon, PlusIcon } from "@radix-ui/react-icons";
import { Form, Formik } from "formik";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <PageTitleSearchBox
        title="Beneficiaries"
        icon={
          <PlusIcon
            color="#FF7434"
            width={24}
            height={24}
            className="text-primary-orange"
          />
        }
      />
      {/*   <Box className="rounded-t-none fixed top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[390px]">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl">Beneficiaries</h1>
          <PlusIcon
            color="#FF7434"
            width={24}
            height={24}
            className="text-primary-orange"
          />
        </div>
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
      </Box> */}

      <Box className="space-y-4">
        {Array(12)
          .fill(3)
          .map((_, idx) => {
            return (
              <div>
                <Link href={`/dashboard/beneficiary?id=${idx}`}>
                  <BeneficiarySlip />
                </Link>
              </div>
            );
          })}
      </Box>
    </div>
  );
}
