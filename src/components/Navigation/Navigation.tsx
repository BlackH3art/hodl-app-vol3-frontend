import { FC, useContext, useEffect, useState } from "react";

import { Link, useNavigate } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners';

import { loggedIn, logout } from "../../api";
import { UserContext } from "../../context/UserContext";
import { UserInterface } from "../../interfaces/UserInterface";
import { MyResponse } from "../../interfaces/MyResponse";
import { shortenEmail } from "../../helpers/shortenEmail";
import logo from '../../images/logo-rectangle.png';

import ButtonPrimary from "../Reusable/ButtonPrimary";
import ButtonSecondary from "../Reusable/ButtonSecondary";


const Navigation: FC = () => {

  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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


  const logoutUser = async () => {
    setLoading(true);
    try {
      const { data }: { data: MyResponse} = await logout();
      if(data.ok) {
        setUser(null);
        navigate('/', { replace: true });
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      toast.error("Problem logging out", { theme: "colored" });
    }
  }

  return(
    <nav className="w-full h-24 border-b-[1px] border-gray-700 bg-[#0c0c0c35] flex justify-center">
      <div className="w-full lg:w-4/5 flex items-center justify-between">

        <Link to="/">
          <img className="w-24 pl-2 lg:pl-0 md:h-20 md:w-auto" src={logo} alt="hoDl!"/>
        </Link>


        <div className="h-full text-white flex items-center">

          {user && (
            <>
              <div className="h-10 w-10 mx-3 shield rounded-full flex items-center justify-center">
                <BsFillPersonFill color="white" size="1.5rem" />
              </div>

              <p className="hidden md:inline text-sm">
                {user.email}
              </p>

              <p className="md:hidden text-sm">
                {shortenEmail(user.email)}
              </p>
            </>
          )}

          {user ? (
            <div className="w-12 mx-2">
              <ButtonSecondary handler={logoutUser}>
                {loading ? <ClipLoader color="white" size="1rem" /> : <FiLogOut color="white" size="1rem" />}
              </ButtonSecondary>
            </div>
          ) : (
            <Link className="mr-2" to="/login">
              <ButtonPrimary title="Login" />
            </Link>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navigation;