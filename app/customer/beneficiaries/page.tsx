"use client";
import BeneficiarySlip from "@/components/BeneficiarySlip";
import Box from "@/components/bits/Box";
import PageTitleSearchBox from "@/components/bits/PageTitleSearchBox";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <PageTitleSearchBox
        title="Beneficiaries"
        icon={
          <Link href="/customer/add-beneficiary">
            <PlusIcon color="#FF7434" width={24} height={24} />
          </Link>
        }
        space="130"
      />

      <Box className="space-y-4">
        {Array(12)
          .fill(3)
          .map((_, idx) => {
            return (
              <div key={idx}>
                <Link href={`/customer/beneficiary?id=${idx}`}>
                  <BeneficiarySlip />
                </Link>
              </div>
            );
          })}
      </Box>
    </div>
  );
}
