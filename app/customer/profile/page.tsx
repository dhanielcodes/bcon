"use client";
import Box from "@/components/bits/Box";
import PageTitleSearchBox from "@/components/bits/PageTitleSearchBox";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export default function Page() {
  return (
    <div>
      <PageTitleSearchBox
        title="Profile"
        icon={<div></div>}
        space="120"
        showSearch={false}
      />

      <Box>
        <div className="grid place-items-center">
          <div className="relative">
            <Image
              alt="pdf"
              width={140}
              height={140}
              src="/images/image.png"
              className="rounded-full"
            />
            <Image
              alt="camera"
              width={30}
              height={30}
              src="/icons/profile/camera.svg"
              className="rounded-full absolute bottom-0 right-0"
            />
          </div>
          <h1 className="text-xl font-bold my-2">Femi Falana</h1>
          <div className="text-sm text-neutral3">Jesuloba@gmail.com</div>
        </div>
      </Box>
      <Box>
        <h4 className="font-medium mb-2 text-lg">Profile</h4>

        <Tab
          title="Profile"
          icon="icons/profile/profile.svg"
          route="customer/profile/profile"
        />
        <Tab
          title="ID Documents"
          icon="icons/profile/document.svg"
          route="customer/profile/document"
        />
        <Tab
          title="Wallet"
          icon="icons/profile/profile.svg"
          route="customer/profile/wallet"
        />

        <Tab
          title="Change address"
          icon="icons/profile/address.svg"
          route="customer/profile/address"
        />

        <Tab
          title="Refer & Earn"
          icon="icons/profile/refer.svg"
          route="customer/profile/earn"
        />
      </Box>
      <Box>
        <h4 className="font-medium mb-2 text-lg">Security & Support</h4>

        <Tab
          title="Password"
          icon="icons/profile/password.svg"
          route="customer/profile/password"
        />
        <Tab
          title="Our bank details"
          icon="icons/profile/bank.svg"
          route="customer/profile/profile"
        />
        <Tab
          title="Contact us"
          icon="icons/profile/contact.svg"
          route="customer/profile/profile"
        />

        <Tab
          title="FAQs"
          icon="icons/profile/faqs.svg"
          route="customer/profile/profile"
        />
      </Box>

      <Link href={"/"}>
        <Box className="rounded-full cursor-pointer text-[#fc0000] flex items-center justify-center space-x-2">
          <LogOut color="#fc0000" /> <span>Logout</span>
        </Box>
      </Link>
    </div>
  );
}

const Tab: FC<{
  title?: string;
  icon?: string;
  route?: string;
}> = ({ title, icon, route }) => {
  return (
    <div>
      <Link href={`/${route}`}>
        <div className="py-3 space-x-2 rounded-3xl flex justify-between items-center">
          <Image alt="pdf" width={50} height={50} src={`/${icon}`} />
          <div className="flex w-full items-center justify-between text-sm">
            <div className="text-sm font-medium">{title}</div>
            <div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.91997 14.0072C5.24664 14.3339 5.77331 14.3339 6.09997 14.0072L11.64 8.46719C11.9 8.20719 11.9 7.78719 11.64 7.52719L6.09997 1.98719C5.77331 1.66052 5.24664 1.66052 4.91997 1.98719C4.59331 2.31385 4.59331 2.84052 4.91997 3.16719L9.74664 8.00052L4.91331 12.8339C4.59331 13.1539 4.59331 13.6872 4.91997 14.0072Z"
                  fill="#98A2B3"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
