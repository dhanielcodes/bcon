"use client";
import Box from "@/components/bits/Box";
import { Form, Formik } from "formik";
import { lazy } from "react";

const DashboardCard = lazy(() => import("@/components/DashboardCard"));
const BaseFilterTab = lazy(() => import("@/components/BaseFilterTab"));
const CountrySelect = lazy(() => import("@/components/CountrySelect"));

export default function Page() {
  return (
    <div>
      <DashboardCard>
        <BaseFilterTab
          tab={[
            { name: "Sent", tab: "sent" },
            { name: "Received", tab: "received" },
          ]}
        />
        <Formik
          initialValues={{ country: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form>
              <CountrySelect name={"country"} className="w-[]" />
            </Form>
          )}
        </Formik>
      </DashboardCard>
      <Box>
        <h1 className="text-2xl mb-2">Dashboard Customer</h1>
      </Box>
    </div>
  );
}
