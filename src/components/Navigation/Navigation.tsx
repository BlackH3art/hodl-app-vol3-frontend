import { FC, useState } from "react";

import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

import logo from '../../images/logo-rectangle.png';
import ButtonPrimary from "../Reusable/ButtonPrimary";
import ButtonSecondary from "../Reusable/ButtonSecondary";

const Navigation: FC = () => {

  const [user, setUser] = useState<string | null>(null);

  return(
    <nav className="w-full h-24 border-b-[1px] border-gray-700 flex justify-center">
      <div className="w-4/5 flex items-center justify-between">

        <Link to="/">
          <img className="h-20" src={logo} alt="hoDl!"/>
        </Link>


        <div className="h-full text-white flex items-center">

          {user && (
            <>
              <div className="h-12 w-12 mx-3 shield rounded-full flex items-center justify-center">
                <BsFillPersonFill color="white" size="2rem" />
              </div>

              <p className="text-lg font-semibold">
                user@email.com
              </p>
            </>
          )}

          {user ? (
            <ButtonSecondary>
              <FiLogOut color="white" size="1.5rem" />
            </ButtonSecondary>
          ) : (
            <Link to="/auth">
              <ButtonPrimary title="Login" />
            </Link>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navigation;