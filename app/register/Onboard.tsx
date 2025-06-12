import LocationSelect from "@/components/fields/LocationSelect";
import { formatOptions } from "@/libs/utils";
import { ApiServiceAuth } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { lazy, useEffect } from "react";
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
  const params = useParams();

  const id = (params?.id as string)?.toLowerCase() || null;
  return (
    <>
      <Box>
        <h1 className="text-2xl mb-2">What's Your Email Address</h1>
        <p className="text-sm">Please enter your details</p>

        {/*  <div className="mt-4">
          Already have an account?{" "}
          <Link className="text-secondary-orange underline" href={"/login"}>
            Sign in
          </Link>
        </div> */}
      </Box>
      <Box>
        <MainSelect
          name="accountType"
          placeholder="Select Account Type"
          isSearchable={false}
          label="Account Type"
          options={[
            { label: "Individual", value: "1" },
            { label: "Corporate", value: "2" },
          ]}
        />
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <FormPasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
        />
        <FormInput
          label="Marketer Code (optional)"
          name="agentId"
          type="text"
          disabled={id ? true : false}
          placeholder="Enter marketer code"
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

const StepTwoComponent = ({ values, setFieldValue }: any) => {
  const { data: countries } = useQuery({
    queryKey: ["GetCountriesQuery"],
    queryFn: () => ApiServiceAuth.GetCountriesQuery(),
  });
  const { data: states, refetch } = useQuery({
    queryKey: ["GetCitiesQuery"],
    queryFn: () => ApiServiceAuth.GetCitiesQuery(values?.country?.id),
    enabled: false,
  });

  useEffect(() => {
    if (values?.country?.id) refetch(values?.country?.id);
  }, [values?.country?.id]);

  console.log(values);

  return (
    <>
      <Box>
        <h1 className="text-2xl mb-2">Personal Information</h1>
        <p className="text-sm">Please enter your details</p>

        {/*     <div className="mt-4">
          Already have an account?{" "}
          <Link className="text-secondary-orange underline" href={"/login"}>
            Sign in
          </Link>
        </div> */}
      </Box>
      <Box>
        <FormInput
          label="First name"
          name="firstName"
          type="text"
          placeholder="Enter first name"
        />
        <FormInput
          label="Last name"
          name="surName"
          type="text"
          placeholder="Enter last name"
        />
        <MainSelect
          name="gender"
          placeholder="Select Gender"
          label="Gender"
          isSearchable={false}
          options={[
            { label: "male", value: "male" },
            { label: "female", value: "female" },
          ]}
        />
        <FormInput
          label="Date of Birth"
          name="dob"
          type="date"
          placeholder="Enter DOB"
        />

        <MainSelect
          name="country[id]"
          placeholder="Select Country of Residence"
          label="Country"
          options={formatOptions(countries?.data, "name", "id")}
          onChange={(value: any) => {
            setFieldValue("code", value?.telephoneCode);
          }}
        />
        <MainSelect
          name="state[id]"
          placeholder="Select City of Residence"
          label="City"
          options={formatOptions(states?.data, "name", "id")}
          onChange={(value) => {
            setFieldValue("city[id]", value?.value);
          }}
        />
        <FormInputNumber
          label="Phone number"
          name="phone"
          placeholder="Enter your phone number"
          max={11}
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

const StepThreeComponent = ({ values, setFieldValue, isPending }: any) => {
  const { data: statuses } = useQuery({
    queryKey: ["GetEmploymentStatusQuery"],
    queryFn: () => ApiServiceAuth.GetEmploymentStatusQuery(),
  });

  const { data: professions } = useQuery({
    queryKey: ["GetProfessionsQuery"],
    queryFn: () => ApiServiceAuth.GetProfessionsQuery(),
  });

  console.log(values);

  return (
    <>
      <Box>
        <h1 className="text-2xl mb-2">Last Step, Your Address</h1>
        <p className="text-sm">Please enter your details</p>

        {/*  <div className="mt-4">
          Already have an account?{" "}
          <Link className="text-secondary-orange underline" href={"/login"}>
            Sign in
          </Link>
        </div> */}
      </Box>
      <Box>
        <LocationSelect
          name="address"
          label="Address"
          placeholder="Enter your address"
          hint="Start typing a city, address, or place"
        />
        <FormInput label="Address 2 (optional)" name="address2" type="text" />
        <MainSelect
          name="employmentStatusId"
          isSearchable={false}
          label="Employment Status"
          options={formatOptions(statuses?.data, "name", "id")}
        />
        <MainSelect
          name="profession[id]"
          placeholder="Profession"
          label="Profession (optional)"
          options={formatOptions(professions?.data, "name", "id")}
        />
        <FormInputNumber
          label="Postcode"
          name="postcode"
          placeholder="Enter code"
        />
        {/*   

        <FormInput
          label="Company name"
          name="code"
          type="text"
          placeholder="Enter code"
          width="w-[510px]"
        /> */}
      </Box>
      <Box className="opacity-0 cursor-default">
        <AppButton disabled placeholder="Submit" className="cursor-default" />
      </Box>
      <Box className="rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 max-width-util mb-0">
        <AppButton placeholder="Submit" loading={isPending} />
      </Box>
    </>
  );
};

Onboard.StepOneComponent = StepOneComponent;
Onboard.StepTwoComponent = StepTwoComponent;
Onboard.StepThreeComponent = StepThreeComponent;

export { Onboard };
