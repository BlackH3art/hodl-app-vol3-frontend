import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { BsClockHistory } from 'react-icons/bs';

import ButtonSecondary from "../Reusable/ButtonSecondary";
import ButtonNavLink from "../Reusable/ButtonNavlink";

interface Props {
  showCallback: Dispatch<SetStateAction<boolean>>
}

const SumbMenu: FC<Props> = ({ showCallback }) => {

  return(
    <div className="w-full xl:w-3/4 h-14 border-b-[1px] border-gray-800 text-gray-300 flex justify-between mt-10">

      <div className="flex">
        <ButtonNavLink classes="ml-2" to="/app/positions" title="Positions" />
        <ButtonNavLink classes="ml-2" to="/app/wallet" title="Wallet" />
      </div>

      <div className="hidden md:flex">
          <div className="mr-2">
            <ButtonSecondary handler={() => showCallback(true)}>
              <p className="px-5">Add transaction</p>
            </ButtonSecondary>
          </div>

          <ButtonNavLink classes="mr-2" to="/app/history" title="History" />

      </div>

      <div className="flex md:hidden">
        <div className="mr-2">
          <Link to="/app/history">
            <ButtonSecondary>
              <p className="px-3">
                <BsClockHistory size="1.5rem"  />
              </p>
            </ButtonSecondary>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default SumbMenu;