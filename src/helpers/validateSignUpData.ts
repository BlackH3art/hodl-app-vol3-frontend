import { SignUpDataError, SignUpFormData } from "../components/SignUpForm/SignUpForm";
import { validateEmail } from "./validateEmail";


export const validateSignUpData = (signUpData: SignUpFormData): SignUpDataError => {

  const error: SignUpDataError = {
    email: [],
    password: [],
    confirmPassword: [],
    terms: "",
  } 

  if(signUpData.email === "") error.email.push("Email cannot be empty");
  if(signUpData.password === "") error.password.push("Password cannot be empty");
  if(signUpData.confirmPassword === "") error.confirmPassword.push("Confirm password cannot be empty");
  if(!signUpData.terms) error.terms = "Consent to privacy policy is required";

  if(!validateEmail(signUpData.email)) error.email.push("Invalid email address");
  if(signUpData.password.length <= 6) error.password.push("Password must be longer than 6 chars");
  if(signUpData.password !== signUpData.confirmPassword) error.password.push("Passwords are not the same");
  if(signUpData.password !== signUpData.confirmPassword) error.confirmPassword.push("Passwords are not the same");


  return error;
}