import { Dispatch, FC, SetStateAction, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { TransactionInterface } from "../../interfaces/TransactionInterface";
import HeaderCell from "../Reusable/HeaderCell";
import RowOpenPositions from "./RowOpenPositions";

interface Props {
  showCallback: Dispatch<SetStateAction<boolean>>
}

const TableOpenPositions: FC<Props> = ({ showCallback }) => {

  const { user } = useContext(UserContext);

  const tableHeaders: string[] = [
    "#", "Ticker", "Price", "Capital", "Change", "PnL(%)", "Sell position", "Actions"
  ];

  return(
    <>
      <thead>
        <tr className="text-gray-300 border-b-[1px] border-gray-500">
          {tableHeaders.map((header: string, index: number) => (
            <HeaderCell key={index}>
              <p className="text-center">
                {header}
              </p>
            </HeaderCell>
          ))}
        </tr>
      </thead>

      <tbody>
        {user ? (
          user.transactions.filter(item => item.open === true).map((item: TransactionInterface, index: number) => (
          <RowOpenPositions 
            id={item._id}
            key={index}
            nr={index + 1}
            ticker={item.ticker}
            entryPrice={item.entryPrice}
            quantity={item.quantity}
            showCallback={showCallback}
          />
        ))) : null}
      </tbody>
    </>
  );
}

export default TableOpenPositions;