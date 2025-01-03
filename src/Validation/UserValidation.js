import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email().required("Username is required"),
  pnumber: yup
    .string()
    .matches(/^[97][0-9]{7}$/, "Phone number must start with 9 or 7 and must have exactly 8 digits")
    .required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
  confirmPassword: yup
  .string()
  .oneOf([yup.ref("password"),null],"Passwords does not match!")
  .required(),
  profilePic: yup.string().url().required("Profile picture is required"),
});
