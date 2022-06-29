import { ChangeEvent, ChangeEventHandler, FC, FormEvent, FormEventHandler, useState } from "react";

import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ButtonPrimary from "../Reusable/ButtonPrimary";
import ButtonSecondary from "../Reusable/ButtonSecondary";
import MyInput from "../Reusable/MyInput";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: FC = () => {

  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: ""});

  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit: FormEventHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  }

  return (
    <section className="w-full flex justify-center items-center min-h-[80vh] border-b-2">

      <div className="glass1 border-[1px] border-gray-500 p-10 text-white flex flex-col items-center">

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
            value={loginData.email}
          />
          <MyInput 
            name="password"
            type="password"
            placeholder="Password"
            handler={handleChange}
            error={false}
            value={loginData.password}
          />

          <div className="mt-6 w-full">
            <ButtonPrimary title="login" handler={handleSubmit} />
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