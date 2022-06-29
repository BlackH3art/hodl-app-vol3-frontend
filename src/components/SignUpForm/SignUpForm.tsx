import { ChangeEvent, ChangeEventHandler, FC, FormEvent, FormEventHandler, useState } from "react";

import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ButtonPrimary from "../Reusable/ButtonPrimary";
import ButtonSecondary from "../Reusable/ButtonSecondary";
import MyInput from "../Reusable/MyInput";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const SignUpForm: FC = () => {

  const [signUpData, setSignUpData] = useState<SignUpFormData>({ email: "", password: "", confirmPassword: "", terms: false });

  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit: FormEventHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  }

  return (
    <section className="w-full flex justify-center items-center min-h-[80vh] border-b-2">

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
            error={false}
            value={signUpData.email}
          />
          <MyInput 
            name="password"
            type="password"
            placeholder="Password"
            handler={handleChange}
            error={false}
            value={signUpData.password}
          />
          <MyInput 
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            handler={handleChange}
            error={false}
            value={signUpData.confirmPassword}
          />

          <label className="flex items-center mt-4 text-sm">
            <input className="mr-2" name="terms" type="checkbox" checked={signUpData.terms} onChange={handleChange} required />
            <p>
              I accept <Link to="terms"> terms</Link> and <Link to="policy"> privacy policy</Link>
            </p>
          </label>
          

          <div className="mt-6 w-full">
            <ButtonPrimary title="Create account" handler={handleSubmit} />
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