import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ButtonPrimary from "../Reusable/ButtonPrimary";

const CookieModal: FC = () => {

  const { setShowCookieModal } = useContext(UserContext);

  const acceptCookie = () => {
    localStorage.setItem('accepted cookie', 'true');
    setShowCookieModal(false);
  }

  return(
    <div className="fixed text-sm z-20 bottom-10 md:bottom-[7rem] sm:right-[50%] sm:translate-x-[50%] sm:translate-y-[50%] cookie-modal rounded-xl w-full sm:w-1/2 md:w-96 flex flex-col items-center">

        <div className="flex text-gray-600 justify-center w-full px-5 pt-5 pb-3 ">
          <p className="text-sm text-center p-3">
            By using this website, you agree to our <Link className="link" to="/policy"> Privacy Policy</Link> and our cookies usage.
          </p>
        </div>

        <div className="flex justify-center w-1/2 pb-3 text-gray-800">
          <ButtonPrimary handler={acceptCookie} title="accept all" />
        </div>

    </div>
  )
}

export default CookieModal;