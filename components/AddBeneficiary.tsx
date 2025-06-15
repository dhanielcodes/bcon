import { ApiServiceAuth } from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInputNumber from "./fields/FormInputNumber";
import FormInput from "./fields/FormInput";
import CurrencySelect from "./CurrencySelect";
import CountrySelect from "./CountrySelect";
import MainSelect from "./fields/MainSelect";
import { formatOptions } from "@/libs/utils";

function AddBeneficiaryModal({ setOpen, open, finished, customerId }: any) {
  const [step, setStep] = useState(0);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [id, setId] = useState<any>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: ApiServiceAuth.AddBeneficiaryMutation,
    onSuccess: () => {
      setStep((curr) => curr + 1);
      setOpen(false);
      finished();
    },
  });

  const localSchema = Yup.object().shape({
    userBeneficiary: Yup.object({
      beneficiaryCountry: Yup.object({
        id: Yup.string().required("Country is required"),
      }),
      currency: Yup.object({
        code: Yup.string().required("Currency is required"),
      }),
      beneficiaryBank: Yup.object({
        accountNumber: Yup.string().required("Account Number is required"),
        bankId: Yup.string().required("Bank is required"),
      }),
    }),
  });

  const internationalSchema = Yup.object().shape({
    userBeneficiary: Yup.object({
      beneficiaryCountry: Yup.object({
        id: Yup.string().required("Country is required"),
      }),
      currency: Yup.object({
        code: Yup.string().required("Currency is required"),
      }),
      beneficiaryBank: Yup.object({
        bankName: Yup.string().required("Required"),
        bankAddress: Yup.string().required("Required"),
        postalCode: Yup.string().required("Required"),
        accountNumber: Yup.string().required("Required"),
        accountName: Yup.string().required("Required"),
        reference: Yup.string().required("Required"),
        bic: Yup.string().required("Required"),
      }),
      correspondenceBank: Yup.object({
        bankName: Yup.string().required("Required"),
        bankAddress: Yup.string().required("Required"),
        accountNumber: Yup.string().required("Required"),
        accountName: Yup.string().required("Required"),
        bic: Yup.string().required("Required"),
      }),
    }),
  });

  const initialValues = {
    userId: customerId,
    userBeneficiary: {
      beneficiaryCountry: {
        id: 0 as number,
      },
      currency: {
        code: "",
      },
      beneficiaryName: "",
      beneficiaryPhoneNumber: "",
      beneficiaryBank: {
        accountNumber: "",
        bankId: "",
      },
    },
  };

  const { data: nameEnquiry, refetch } = useQuery({
    queryKey: ["NameEnquiry"],
    queryFn: (): Promise<any> =>
      ApiServiceAuth.NameEnquiry({
        bankCode: selectedBank?.bankCode,
        accountNumber: selectedBank?.accountNumber,
      }),
    enabled: false,
  });

  const handleSubmit = (values: any) => {
    if (values.userBeneficiary.beneficiaryCountry.id === 161) {
      mutate({
        userId: customerId,
        userBeneficiary: {
          ...values.userBeneficiary,
          beneficiaryName: nameEnquiry?.data?.account_name,
          beneficiaryBank: {
            accountNumber: nameEnquiry?.data?.account_number,
            bankId: selectedBank?.bankId,
          },
        },
      });
    } else {
      mutate({
        userId: customerId,
        userBeneficiary: values.userBeneficiary,
      });
    }
  };

  const { data: countries } = useQuery({
    queryKey: ["GetCountriesQueryy"],
    queryFn: () => ApiServiceAuth.GetCountriesQuery(),
  });

  const { data: banks } = useQuery({
    queryKey: ["GetBanksQuery"],
    queryFn: () => ApiServiceAuth.GetBanksQuery(),
  });

  useEffect(() => {
    if (selectedBank?.accountNumber?.length === 10 && selectedBank?.bankId)
      refetch();
  }, [selectedBank?.accountNumber]);

  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50  overflow-hidden overflow-y-scroll py-10">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-auto">
          <div className="text-xl font-bold mb-4">Add Beneficiary</div>
          <Formik
            initialValues={initialValues}
            validationSchema={id === 161 ? localSchema : internationalSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => {
              console.log(values);

              return (
                <Form>
                  {values.userBeneficiary.beneficiaryCountry.id === 161 ? (
                    <div className="space-y-4">
                      <MainSelect
                        name="userBeneficiary.beneficiaryCountry.id"
                        label="Country"
                        options={formatOptions(countries?.data, "name", "id")}
                        onChange={(value: any) => {
                          setId(value?.id);
                        }}
                      />

                      <label
                        className={`block text-[#344054] text-sm font-medium`}
                      >
                        Currency
                      </label>
                      <CurrencySelect
                        onChange={(value: any) => {
                          setFieldValue(
                            "userBeneficiary.currency.code",
                            value?.code
                          );
                        }}
                      />
                      <MainSelect
                        label="Select Bank"
                        name="userBeneficiary.beneficiaryBank.bankId"
                        options={formatOptions(
                          banks?.data,
                          "bankName",
                          "bankCode"
                        )}
                        onChange={(selected) => setSelectedBank(selected)}
                      />
                      <FormInputNumber
                        label="Account Number"
                        name="userBeneficiary.beneficiaryBank.accountNumber"
                        width="100%"
                        onChange={(e) => {
                          setSelectedBank({
                            ...selectedBank,
                            accountNumber: e,
                          });
                        }}
                        max={10}
                        hint={nameEnquiry?.data?.account_name}
                      />
                      <div>{nameEnquiry?.data?.account_name}</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <MainSelect
                        name="userBeneficiary.beneficiaryCountry.id"
                        label="Country"
                        options={formatOptions(countries?.data, "name", "id")}
                        onChange={(value: any) => {
                          setId(value?.id);
                        }}
                      />

                      <CurrencySelect
                        onChange={(value: any) => {
                          setFieldValue(
                            "userBeneficiary.currency.code",
                            value?.code
                          );
                        }}
                      />
                      <FormInput
                        label="Bank Name"
                        name="userBeneficiary.beneficiaryBank.bankName"
                        width="100%"
                      />
                      <FormInput
                        label="Bank Address"
                        name="userBeneficiary.beneficiaryBank.bankAddress"
                        width="100%"
                      />
                      <FormInputNumber
                        label="Postal Code"
                        name="userBeneficiary.beneficiaryBank.postalCode"
                        width="100%"
                      />
                      <FormInputNumber
                        label="IBAN/Account Number"
                        name="userBeneficiary.beneficiaryBank.accountNumber"
                        width="100%"
                      />
                      <FormInput
                        label="Account Name"
                        name="userBeneficiary.beneficiaryBank.accountName"
                        width="100%"
                      />
                      <FormInputNumber
                        label="BIC/Swiftcode"
                        name="userBeneficiary.beneficiaryBank.bic"
                        width="100%"
                      />
                      <FormInput
                        label="Reference"
                        name="userBeneficiary.beneficiaryBank.reference"
                        width="100%"
                      />

                      <h4 className="font-medium">Correspondent Bank</h4>
                      <FormInput
                        label="Bank Name"
                        name="userBeneficiary.correspondenceBank.bankName"
                        width="100%"
                      />
                      <FormInput
                        label="Bank Address"
                        name="userBeneficiary.correspondenceBank.bankAddress"
                        width="100%"
                      />
                      <FormInputNumber
                        label="IBAN/Account Number"
                        name="userBeneficiary.correspondenceBank.accountNumber"
                        width="100%"
                      />
                      <FormInput
                        label="Account Name"
                        name="userBeneficiary.correspondenceBank.accountName"
                        width="100%"
                      />
                      <FormInputNumber
                        label="BIC/Swiftcode"
                        name="userBeneficiary.correspondenceBank.bic"
                        width="100%"
                      />
                    </div>
                  )}
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isPending}
                      onClick={() => handleSubmit(values)}
                      className="px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
                    >
                      {isPending ? "Saving..." : "Save Beneficiary"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    )
  );
}

export default AddBeneficiaryModal;
