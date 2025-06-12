import * as Yup from "yup";

// Validation schema for the send money data list items
const sendMoneyDataListSchema = Yup.object().shape({
  userBeneficiaryId: Yup.string().required("Beneficiary is required"),
  amount: Yup.number()
    .required("Amount is required")
    .min(0.01, "Amount must be greater than 0")
    .typeError("Amount must be a number"),
  purpose: Yup.string().required("Purpose of transfer is required"),
  note: Yup.string().optional(),
  documentTypeId: Yup.string().when("documentURL", {
    is: (val: string) => val && val.length > 0,
    then: (schema) =>
      schema.required("Document type is required when document is uploaded"),
    otherwise: (schema) => schema.optional(),
  }),
  documentURL: Yup.string().optional(),
  from: Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .min(0.01, "Amount must be greater than 0")
      .typeError("Amount must be a number"),
  }),
  to: Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .min(0.01, "Amount must be greater than 0")
      .typeError("Amount must be a number"),
  }),
});

// Step 1 validation schema
export const stepOneSchema = Yup.object().shape({
  sendMoneyDataList: Yup.array().min(1, "At least one beneficiary is required"),
});

// Step 2 validation schema
export const stepTwoSchema = Yup.object().shape({
  from: Yup.object().shape({
    id: Yup.number().required("From currency is required"),
    currency: Yup.string().required("From currency is required"),
  }),
  to: Yup.object().shape({
    id: Yup.number().required("To currency is required"),
    currency: Yup.string().required("To currency is required"),
  }),
  fromCurrencyId: Yup.number().required("From currency is required"),
  toCurrencyId: Yup.number().required("To currency is required"),
  paymentChannelId: Yup.string().required("Payment channel is required"),
  payoutChannelId: Yup.string().required("Payout channel is required"),
  name: Yup.string().optional(),
  sendMoneyDataList: Yup.array().min(1, "At least one beneficiary is required"),
  conversionRate: Yup.number()
    .required("Conversion rate is required")
    .min(0, "Invalid conversion rate"),
  fee: Yup.number()
    .required("Transaction fee is required")
    .min(0, "Invalid transaction fee"),
});

// Step 3 validation schema (final review)
export const stepThreeSchema = Yup.object().shape({
  sendMoneyDataList: Yup.array().min(1, "At least one beneficiary is required"),
  from: Yup.object().shape({
    id: Yup.number().required("From currency is required"),
    currency: Yup.string().required("From currency is required"),
  }),
  to: Yup.object().shape({
    id: Yup.number().required("To currency is required"),
    currency: Yup.string().required("To currency is required"),
  }),
  paymentChannelId: Yup.string().required("Payment channel is required"),
  payoutChannelId: Yup.string().required("Payout channel is required"),
  conversionRate: Yup.number()
    .required("Conversion rate is required")
    .min(0, "Invalid conversion rate"),
  fee: Yup.number()
    .required("Transaction fee is required")
    .min(0, "Invalid transaction fee"),
});

// Complete validation schema for the entire form
// Complete validation schema for the entire form
export const sendMoneySchema = Yup.object().shape({
  userId: Yup.string().required("User ID is required"),
  fromCurrencyId: Yup.number().required("From currency is required"),
  toCurrencyId: Yup.number().required("To currency is required"),
  paymentChannelId: Yup.string().required("Payment channel is required"),
  payoutChannelId: Yup.string().required("Payout channel is required"),
  name: Yup.string().optional(),
  walletId: Yup.number().optional(),
  purpose: Yup.string().optional(),
  note: Yup.string().optional(),
  transactionSource: Yup.string().required("Transaction source is required"),
  promoCode: Yup.string().optional(),
  redirectURL: Yup.string().required("Redirect URL is required"),
  source: Yup.string().required("Source is required"),
  sendMoneyDataList: Yup.array().min(1, "At least one beneficiary is required"),
  transitionFee: Yup.number()
    .required("Transaction fee is required")
    .min(0, "Invalid transaction fee"),
});
