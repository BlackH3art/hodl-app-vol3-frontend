import { ChangeEvent, ChangeEventHandler, FC, FormEvent, FormEventHandler, useContext, useState } from "react";

import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from "react-toastify";

import { login, signUp } from "../../api";
import { UserContext } from "../../context/UserContext";
import { validateSignUpData } from "../../helpers/validateSignUpData";
import { MyResponse } from "../../interfaces/MyResponse";
import { UserInterface } from "../../interfaces/UserInterface";

import ButtonPrimary from "../Reusable/ButtonPrimary";
import ButtonSecondary from "../Reusable/ButtonSecondary";
import MyInput from "../Reusable/MyInput";

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface SignUpDataError {
  email: string[];
  password: string[];
  confirmPassword: string[];
  terms: string;
}

const initialError: SignUpDataError = {
  email: [],
  password: [],
  confirmPassword: [],
  terms: "",
} 

const SignUpForm: FC = () => {

  const [signUpData, setSignUpData] = useState<SignUpFormData>({ email: "", password: "", confirmPassword: "", terms: false });
  const [error, setError] = useState<SignUpDataError>(initialError);
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {

    setError(initialError);

    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    })
  }

  const handleTermsChecked: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(initialError);

    setSignUpData({
      ...signUpData,
      terms: e.target.checked
    });
  }

  const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(initialError);
    setLoading(true);

    const signUpDataErrors = validateSignUpData(signUpData);

    if(signUpDataErrors.email.length || signUpDataErrors.password.length || signUpDataErrors.confirmPassword.length || signUpDataErrors.terms !== "") {
      setError(signUpDataErrors);
      setLoading(false);

      return; 

    } else {

      try {
  
        const { data }: { data: MyResponse } = await signUp(signUpData);
  
        if(data.ok) {
          const { data: user }: { data: UserInterface } = await login({ email: signUpData.email, password: signUpData.password });
  
          setUser(user);
          setLoading(false);
          navigate('/app', { replace: true });
        }
        
      } catch (error: any) {
        toast.error("Something went wrong!", { theme: "colored" }); 
        setLoading(false);
        setError(error.response.data.msg);
      }
    }
  }

  return (
    <section className="w-full flex justify-center items-center min-h-[80vh]">

      <div className="border-[1px] glass1 border-gray-500 p-10 text-white flex flex-col items-center">

        <div className="h-14 w-14 mx-3 border-[1px] border-gray-600 p-2 rounded-full flex items-center justify-center">
          <FaLock color="white" size="1.5rem" />
        </div>

        <form className="text-white w-full flex flex-col items-center">

          <MyInput 
            name="email"
            type="text"
            placeholder="E-mail"
            handler={handleChange}
            error={error.email[0]}
            value={signUpData.email}
          />
          <MyInput 
            name="password"
            type="password"
            placeholder="Password"
            handler={handleChange}
            error={error.password[0]}
            value={signUpData.password}
          />
          <MyInput 
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            handler={handleChange}
            error={error.confirmPassword[0]}
            value={signUpData.confirmPassword}
          />

          <div className="flex flex-col">
            <label className="flex items-center mt-4 text-sm">
              <input className="mr-2" name="terms" type="checkbox" checked={signUpData.terms} onChange={handleTermsChecked} required />
              <p>
                I accept <Link className="link" to="policy"> privacy policy</Link>
              </p>
            </label>
            
            {error.terms !== "" && <p className="text-sm text-red-400 ">{error.terms}</p>}

          </div>
          

          <div className="mt-6 w-full">
            <ButtonPrimary handler={handleSubmit}>
              {loading ? (
                <ClipLoader size="1.5rem" />
              ) : (
                <p>
                  Create account
                </p>
              )}
            </ButtonPrimary>
          </div>

          <Link to="/login" className="mt-2 w-full">
            <ButtonSecondary title="I already have account" />
          </Link>
          
        </form>

      </div>

    </section>
  )
}

export default SignUpForm;