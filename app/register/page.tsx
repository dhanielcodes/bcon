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
import { CheckCircledIcon } from "@radix-ui/react-icons";
import AppButton from "@/components/fields/AppButton";
import { LucideApple, Play } from "lucide-react";

const SuccessModal = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose?: () => void;
  data?: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircledIcon className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold">Signup Successful!</h2>
          <p className="text-gray-600">
            You can now login to your account on the mobile app
          </p>

          <AppButton
            //IconLeft={LucideApple}
            onClick={() => {
              window.location.href =
                "https://apps.apple.com/ng/app/bcon/id1557952054";
            }}
            placeholder="Apple IOS"
            className="w-full mt-4"
          />
          <AppButton
            //IconLeft={Play}
            onClick={() => {
              window.location.href =
                "https://play.google.com/store/apps/details?id=com.bconsolutionltd.bcon.bcons_bcons_revamped&pcampaignid=web_share";
            }}
            placeholder="Android Device"
            className="w-full mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const [active, setActive] = useState<number>(1);
  const { mutate, isPending, data } = useSignUp();
  const params = useParams();

  useEffect(() => {
    setActive(1);
  }, [data]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  useEffect(() => {
    if (data) {
      setShowSuccessModal(true);
    }
  }, [data]);

  const id = (params?.id as string)?.toLowerCase() || null;
  return (
    <div>
      <SuccessModal isOpen={showSuccessModal} data={data} />
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
          postcode: "",
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
            const {
              code,
              agentId,
              accountType,
              firstName,
              surName,
              ...restValues
            } = values;
            const payload = {
              ...restValues,
              firstName: firstName?.trim(),
              surName: surName?.trim(),
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
