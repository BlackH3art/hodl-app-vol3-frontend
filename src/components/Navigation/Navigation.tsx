import { FC, useContext, useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

import logo from '../../images/logo-rectangle.png';
import ButtonPrimary from "../Reusable/ButtonPrimary";
import ButtonSecondary from "../Reusable/ButtonSecondary";
import { UserContext } from "../../context/UserContext";
import { loggedIn } from "../../api";
import { UserInterface } from "../../interfaces/UserInterface";

const Navigation: FC = () => {

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {

    async function isUserLoggedIn() {
      try {
        const { data }: { data: UserInterface } = await loggedIn();
        setUser(data) ;
        
      } catch (error) {
        setUser(null);
      }
    }

    isUserLoggedIn();

  }, []);

  return(
    <nav className="w-full h-24 border-b-[1px] border-gray-700 bg-[#0c0c0c35] flex justify-center">
      <div className="w-4/5 flex items-center justify-between">

        <Link to="/">
          <img className="h-20" src={logo} alt="hoDl!"/>
        </Link>


        <div className="h-full text-white flex items-center">

          {user && (
            <>
              <div className="h-10 w-10 mx-3 shield rounded-full flex items-center justify-center">
                <BsFillPersonFill color="white" size="1.5rem" />
              </div>

              <p className="text-sm ">
                {user.email}
              </p>
            </>
          )}

          {user ? (
            <div className="w-12 mx-2">
              <ButtonSecondary>
                <FiLogOut color="white" size="1rem" />
              </ButtonSecondary>
            </div>
          ) : (
            <Link to="/login">
              <ButtonPrimary title="Login" />
            </Link>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navigation;