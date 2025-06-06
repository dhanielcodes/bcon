import Link from "next/link";
import React, { lazy } from "react";
const Box = lazy(() => import("@/components/bits/Box"));

const FormInput = lazy(() => import("@/components/fields/FormInput"));
const FormInputNumber = lazy(
  () => import("@/components/fields/FormInputNumber")
);
const FormPasswordInput = lazy(
  () => import("@/components/fields/FormPasswordInput")
);
const MainSelect = lazy(() => import("@/components/fields/MainSelect"));
const AppButton = lazy(() => import("@/components/fields/AppButton"));

const Onboard = () => {
  return <div></div>;
};

const StepOneComponent = () => {
  return (
    <>
      <Box>
        <h1 className="text-2xl mb-2">What's Your Email Address</h1>
        <p className="text-sm">Please enter your details</p>

        <div className="mt-4">
          Already have an account?{" "}
          <Link className="text-secondary-orange underline" href={"/login"}>
            Sign in
          </Link>
        </div>
      </Box>
      <Box>
        <MainSelect
          name="type"
          placeholder="Select Account Type"
          label="Account Type"
          options={[
            { label: "Customer", value: "customer" },
            { label: "Agent", value: "agent" },
          ]}
        />
        <FormInput
          label="Email/Phone Number"
          name="email"
          type="email"
          placeholder="Enter your email"
          width="w-[510px]"
        />
        <FormPasswordInput
          label="Password"
          name="password"
          placeholder="Enter your email"
          width="w-[510px]"
        />
        <FormInput
          label="Invite Code"
          name="code"
          type="text"
          placeholder="Enter code"
          width="w-[510px]"
        />
      </Box>
      <Box className="opacity-0 cursor-default">
        <AppButton disabled placeholder="Submit" className="cursor-default" />
      </Box>
      <Box className="rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 max-width-util mb-0">
        <AppButton placeholder="Submit" />
      </Box>
    </>
  );
};

const StepTwoComponent = () => {
  return (
    <>
      <Box>
        <h1 className="text-2xl mb-2">Personal Information</h1>
        <p className="text-sm">Please enter your details</p>

        <div className="mt-4">
          Already have an account?{" "}
          <Link className="text-secondary-orange underline" href={"/login"}>
            Sign in
          </Link>
        </div>
      </Box>
      <Box>
        <FormInput
          label="First name"
          name="email"
          type="email"
          placeholder="Enter your email"
          width="w-[510px]"
        />
        <FormInput
          label="Last name"
          name="email"
          type="email"
          placeholder="Enter your email"
          width="w-[510px]"
        />
        <MainSelect
          name="type"
          placeholder="Select Account Type"
          label="Country"
          options={[
            { label: "Customer", value: "customer" },
            { label: "Agent", value: "agent" },
          ]}
        />
        <MainSelect
          name="type"
          placeholder="Select Account Type"
          label="Country"
          options={[
            { label: "Customer", value: "customer" },
            { label: "Agent", value: "agent" },
          ]}
        />
        <MainSelect
          name="type"
          placeholder="Select Account Type"
          label="City"
          options={[
            { label: "Customer", value: "customer" },
            { label: "Agent", value: "agent" },
          ]}
        />
        <FormInputNumber
          label="Phone number"
          name="email"
          placeholder="Enter your email"
          width="w-[510px]"
        />
      </Box>
      <Box className="opacity-0 cursor-default">
        <AppButton disabled placeholder="Submit" className="cursor-default" />
      </Box>
      <Box className="rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 max-width-util mb-0">
        <AppButton placeholder="Submit" />
      </Box>
    </>
  );
};

const StepThreeComponent = () => {
  return (
    <>
      <Box>
        <h1 className="text-2xl mb-2">Last Step, Your Address</h1>
        <p className="text-sm">Please enter your details</p>

        <div className="mt-4">
          Already have an account?{" "}
          <Link className="text-secondary-orange underline" href={"/login"}>
            Sign in
          </Link>
        </div>
      </Box>
      <Box>
        <FormInputNumber
          label="Postcode"
          name="code"
          placeholder="Enter code"
          width="w-[510px]"
        />
        <FormInput
          label="Address"
          name="email"
          type="text"
          placeholder="Enter your email"
          width="w-[510px]"
        />
        <MainSelect
          name="type"
          placeholder="Profession"
          label="Profession"
          options={[
            { label: "Customer", value: "customer" },
            { label: "Agent", value: "agent" },
          ]}
        />
        <MainSelect
          name="type"
          placeholder="status"
          label="Employment Status"
          options={[
            { label: "Customer", value: "customer" },
            { label: "Agent", value: "agent" },
          ]}
        />
        <FormInput
          label="Company name"
          name="code"
          type="text"
          placeholder="Enter code"
          width="w-[510px]"
        />
      </Box>
      <Box className="opacity-0 cursor-default">
        <AppButton disabled placeholder="Submit" className="cursor-default" />
      </Box>
      <Box className="rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 max-width-util mb-0">
        <AppButton placeholder="Submit" />
      </Box>
    </>
  );
};

Onboard.StepOneComponent = StepOneComponent;
Onboard.StepTwoComponent = StepTwoComponent;
Onboard.StepThreeComponent = StepThreeComponent;

export { Onboard };
