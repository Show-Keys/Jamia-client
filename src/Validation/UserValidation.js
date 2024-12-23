import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  uname: yup.string().required("Username is required"),
  pnumber: yup
    .string()
    .matches(/^[97][0-9]{7}$/, "Phone number must start with 9 or 7 and must have exactly 8 digits")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
  adminCode: yup.string().optional(),
});
