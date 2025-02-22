"use client";
import BeneficiarySlip from "@/components/BeneficiarySlip";
import BackBtn from "@/components/bits/BackBtn";
import Box from "@/components/bits/Box";
import PageTitle from "@/components/bits/PageTitle";
import DetailsCard from "@/components/DetailsCard";
import FormRegularInput from "@/components/fields/FormRegularInput";
import { ArrowLeftIcon, BellIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { Form, Formik } from "formik";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { lazy } from "react";

const AppButton = lazy(() => import("@/components/fields/AppButton"));

export default function Page() {
  return (
    <div>
      <PageTitle title="Transaction Details" icon={<div></div>} />
      <Box className="space-y-4">
        <div className="grid place-items-center">
          <div className="text-neutral3 mb-4">03-08-1968 12:32:45</div>

          <Image
            alt="tick"
            width={90}
            height={90}
            src="/images/success-tick.svg"
            className="rounded-full "
          />

          <h1 className="font-medium text-xl mt-4 mb-3">£25</h1>
          <div className="text-neutral3 mb-3 text-sm">₦25,382.02</div>
        </div>

        <DetailsCard
          title="Details"
          details={[
            { title: "Transfer Status", value: "Success" },
            { title: "Recipient name", value: "03-08-1968" },
            { title: "Amount sent", value: "+2349090003344" },
            { title: "Amount received", value: "44 Freedom Way" },
            { title: "Rate", value: "Galeway" },
            { title: "Transaction fee", value: "$0.00" },
            { title: "Payment type", value: "Pay with Bank" },
            { title: "Collection type", value: "Direct to bank" },
            { title: "Purpose", value: "Family Support" },
          ]}
        />
      </Box>
      <Box>
        <DetailsCard
          title="Bank transfer details"
          details={[
            { title: "Account name", value: "Femi Falana" },
            { title: "Bank name", value: "Leatherback" },
            { title: "Account number", value: "0903994433" },
            { title: "Sort code", value: "94433" },
            { title: "Reference No", value: "0903994433" },
          ]}
        />
      </Box>
      <Box className="rounded-full cursor-pointer text-primary-orange flex items-center justify-center space-x-2">
        <Share2 color="#fc5900" /> <span>Share receipt</span>
      </Box>
    </div>
  );
}
