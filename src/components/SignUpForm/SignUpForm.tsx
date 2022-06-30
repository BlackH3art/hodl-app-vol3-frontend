import { ChangeEvent, ChangeEventHandler, FC, FormEvent, FormEventHandler, useContext, useState } from "react";

import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from "react-toastify";

import { login, signUp } from "../../api";
import { UserContext } from "../../context/UserContext";
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

const SignUpForm: FC = () => {

  const [signUpData, setSignUpData] = useState<SignUpFormData>({ email: "", password: "", confirmPassword: "", terms: false });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {

    setError('');

    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

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

  return (
    <section className="w-full flex justify-center items-center min-h-[80vh] border-b-2">

      <div className="border-[1px] glass1 border-gray-500 p-10 text-white flex flex-col items-center">

        <div className="h-14 w-14 mx-3 border-[1px] border-gray-600 p-2 rounded-full flex items-center justify-center">
          <FaLock color="white" size="1.5rem" />
        </div>

        <p className="text-sm text-red-400 py-3">
          {error}
        </p>

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