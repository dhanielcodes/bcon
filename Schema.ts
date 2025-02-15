import * as Yup from "yup";
export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required("Email is required"),
    password: Yup.string().required("Password is required"),
});


export const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required("Email is required"),
    phone_number: Yup.string().required("Phone Number is required")
});
export const OtpSchema = Yup.object().shape({
    otp: Yup.string().required("Otp is required")
});
/* export const CompleteSignUpSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    password: Yup.string().required("Password is required")?.min(8, "Must be 8 characters or more")
        ?.matches(/[a-z]+/, "One lowercase character")
        ?.matches(/[A-Z]+/, "One uppercase character")
        ?.matches(/[@$!%*#?&]+/, "One special character")
        ?.matches(/\d+/, "One number"),
        confirm_password: Yup.string().required("Confirm Password").oneOf([Yup.ref('password'), null], 'Passwords must match'), 
});
 */

export const EditProfileSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required("Email is required"),
    phone_number: Yup.string().required("Password is required"),
    name: Yup.string().required("Password is required"),
});
