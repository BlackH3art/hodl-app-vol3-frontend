import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { BsClockHistory } from 'react-icons/bs';

import ButtonSecondary from "../Reusable/ButtonSecondary";

interface Props {
  showCallback: Dispatch<SetStateAction<boolean>>
}

const SumbMenu: FC<Props> = ({ showCallback }) => {

  return(
    <div className="w-full xl:w-3/4 h-14 border-b-[1px] border-gray-800 text-gray-300 flex justify-between">

      <div className="flex">
        <Link className="ml-2" to="/app/positions">
          <ButtonSecondary>
            <p className="px-5">Positions</p>
          </ButtonSecondary>
        </Link>

        <Link className="ml-2" to="/app/wallet">
          <ButtonSecondary>
            <p className="px-5">Wallet</p>
          </ButtonSecondary>
        </Link>
      </div>

      <div className="hidden md:flex">
          <div className="mr-2">
            <ButtonSecondary handler={() => showCallback(true)}>
              <p className="px-5">Add transaction</p>
            </ButtonSecondary>
          </div>
          <div className="mr-2">
            <Link to="/app/history">
              <ButtonSecondary>
                <p className="px-5">History</p>
              </ButtonSecondary>
            </Link>
          </div>
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