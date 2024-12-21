import * as Yup from "yup";
const today = new Date();
today.setHours(0, 0, 0, 0); // Remove time portion for accurate comparison
  
const AddJamiyaValidation = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  // noOfMembers: Yup.number()
  //   .min(1, "At least 1 member is required") .nullable() // Allow null values
  //   .transform((value, originalValue) =>
  //     originalValue === '' ? null : value
  //   )
  //   .required("Number of Members is required"),
  noOfMonths: Yup.number()
    .min(1, "Number of months must be at least 1").nullable() // Allow null values
    .transform((value, originalValue) =>
      originalValue === '' ? null : value
    )
    .required("Number of Months is required"),
  startDay: Yup
  .date().nullable() // Allow null values
  .transform((value, originalValue) =>
    originalValue === '' ? null : value
  ).min(today, 'You cannot select a past date')
  .required("Start Date is required") // Custom error message for required
  .nullable(), // Allow null if necessary,
  description: Yup.string().required("Description is required"),
  rulesAccepted: Yup.boolean()
    .oneOf([true], "You must accept the rules and policies")
    .required(),
});

export default AddJamiyaValidation;
 