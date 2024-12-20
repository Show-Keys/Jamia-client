import * as yup from 'yup';

export const LoginValidation = yup.object().shape({
  uname: yup.string().required("Username should not be empty"),
  password: yup.string().min(6, "Minimum 6 characters").max(50, "Maximum 50 characters").required("Password should not be empty"),
});
