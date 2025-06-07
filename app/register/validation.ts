import * as Yup from "yup";

export const stepOneSchema = Yup.object().shape({
  accountType: Yup.string()
    .required("Account type is required")
    .oneOf(["1", "2"], "Please select a valid account type"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  agentId: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .optional(),
});

export const stepTwoSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  surName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["male", "female"], "Please select a valid gender"),
  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .test("age", "You must be at least 15 years old", function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 15;
      }
      return age >= 15;
    }),
  country: Yup.object().shape({
    id: Yup.string().required("Country is required"),
  }),
  state: Yup.object().shape({
    id: Yup.string().required("State is required"),
  }),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
});

export const stepThreeSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  address2: Yup.string().optional(),
  employmentStatusId: Yup.string()
    .required("Employment status is required")
    .oneOf(["customer", "agent"], "Please select a valid employment status"),
  profession: Yup.object().shape({
    id: Yup.string().when("employmentStatusId", {
      is: "customer",
      then: (schema) => schema.required("Profession is required"),
      otherwise: (schema) => schema.optional(),
    }),
    name: Yup.string().when("employmentStatusId", {
      is: "customer",
      then: (schema) => schema.required("Profession name is required"),
      otherwise: (schema) => schema.optional(),
    }),
  }),
});

export const registerSchema = Yup.object().shape({
  accountType: Yup.string().required("Account type is required"),
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  surName: Yup.string()
    .required("Surname is required")
    .min(2, "Surname must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .test("age", "You must be at least 15 years old", function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 15;
      }
      return age >= 15;
    }),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  address: Yup.string().required("Address is required"),
  country: Yup.object().shape({
    id: Yup.string().required("Country is required"),
  }),
  state: Yup.object().shape({
    id: Yup.string().required("State is required"),
  }),
  city: Yup.object().shape({
    id: Yup.string().required("City is required"),
  }),
  employmentStatusId: Yup.string().required("Employment status is required"),
  profession: Yup.object().shape({
    id: Yup.string().required("Profession is required"),
    name: Yup.string().required("Profession name is required"),
  }),
  onboardingSource: Yup.string().default("Web"),
  agentId: Yup.number().default(0),
});
