import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import ButtonSecondary from "../Reusable/ButtonSecondary";

interface Props {
  showCallback: Dispatch<SetStateAction<boolean>>
}

const SumbMenu: FC<Props> = ({ showCallback }) => {

  return(
    <div className="w-3/4 h-14 border-b-[1px] border-gray-800 text-gray-300 flex justify-between">

      <div className="flex">
        <Link className="ml-2" to="/positions">
          <ButtonSecondary>
            <p className="px-5">Open positions</p>
          </ButtonSecondary>
        </Link>

        <Link className="ml-2" to="/wallet">
          <ButtonSecondary>
            <p className="px-5">Wallet</p>
          </ButtonSecondary>
        </Link>
      </div>

      <div className="flex">
          <div className="mr-2">
            <ButtonSecondary handler={() => showCallback(true)}>
              <p className="px-5">Add transaction</p>
            </ButtonSecondary>
          </div>
          <div className="mr-2">
            <ButtonSecondary>
              <p className="px-5">History</p>
            </ButtonSecondary>
          </div>
      </div>

    </div>
  )
}

export default SumbMenu;