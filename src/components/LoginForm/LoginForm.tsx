import { ChangeEvent, ChangeEventHandler, FC, FormEvent, FormEventHandler, useContext, useState } from "react";

import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners';

import { login } from "../../api";
import { UserInterface } from "../../interfaces/UserInterface";

import ButtonPrimary from "../Reusable/ButtonPrimary";
import ButtonSecondary from "../Reusable/ButtonSecondary";
import MyInput from "../Reusable/MyInput";
import { UserContext } from "../../context/UserContext";

export interface LoginData {
  email: string;
  password: string;
}

const LoginForm: FC = () => {

  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: ""});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {

    setError('');

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      
      const { data: user }: { data: UserInterface } = await login(loginData);
      
      setUser(user);
      setLoading(false);

      navigate('/app/positions', { replace: true });
    } catch (error: any) {

      setLoading(false);

      if(error.response.data.msg === "Invalid login or password") {
        setError(error.response.data.msg);
      } else {
        toast.error("Something went wrong!", { theme: "colored" }); 
      }
    }
  }

  return (
    <section className="w-full flex justify-center items-center min-h-[80vh]">

      <div className="glass1 border-[1px] border-gray-500 p-10 text-white flex flex-col items-center">

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
            error={""}
            value={loginData.email}
          />
          <MyInput 
            name="password"
            type="password"
            placeholder="Password"
            handler={handleChange}
            error={""}
            value={loginData.password}
          />

          <div className="mt-6 w-full">
            <ButtonPrimary handler={handleSubmit}>
              {loading ? (
                <ClipLoader size="1.5rem" />
              ) : (
                <p>
                  Login
                </p>
              )}
            </ButtonPrimary>
          </div>

          <Link to="/signUp" className="mt-2 w-full">
            <ButtonSecondary title="I don't have accpunt" />
          </Link>
          
        </form>

      </div>

    </section>
  )
}

export default LoginForm;