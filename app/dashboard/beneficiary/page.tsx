"use client";
import BeneficiarySlip from "@/components/BeneficiarySlip";
import BackBtn from "@/components/bits/BackBtn";
import Box from "@/components/bits/Box";
import PageTitle from "@/components/bits/PageTitle";
import DetailsCard from "@/components/DetailsCard";
import FormRegularInput from "@/components/fields/FormRegularInput";
import { ArrowLeftIcon, BellIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { Form, Formik } from "formik";
import Image from "next/image";
import { lazy } from "react";

const AppButton = lazy(() => import("@/components/fields/AppButton"));

export default function Page() {
  return (
    <div>
      <PageTitle
        title="Beneficiary Details"
        icon={
          <Image
            src="/icons/horizontal-elipse.svg"
            width={26}
            height={26}
            alt="elipse"
          />
        }
      />
      <Box className="space-y-4">
        <div className="grid place-items-center">
          <Image
            alt="pdf"
            width={60}
            height={60}
            src="/icons/profile.png"
            className="rounded-full"
          />

          <h1>Femi Falana</h1>
        </div>

        <DetailsCard
          details={[
            { title: "Full name", value: "Femi Falana" },
            { title: "Date of Birth", value: "03-08-1968" },
            { title: "Mobile number", value: "+2349090003344" },
            { title: "Address", value: "44 Freedom Way" },
            { title: "City", value: "Galeway" },
            { title: "Country", value: "United Kingdom" },
          ]}
        />
      </Box>
      <Box>
        <DetailsCard
          title="Bank Details"
          details={[
            { title: "Account name", value: "Femi Falana" },
            { title: "Bank name", value: "GTBank" },
            { title: "Account number", value: "0903994433" },
          ]}
        />
      </Box>
      <Box className="space-x-2 grid grid-cols-[1fr_2fr]">
        <AppButton placeholder="Upload ID" outline className="mt-0" />
        <AppButton placeholder="Send money" className="mt-0" />
      </Box>
    </div>
  );
}
