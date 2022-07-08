import { FC, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { TransactionInterface } from "../../interfaces/TransactionInterface";
import { UserDocument } from "../../interfaces/UserInterface";
import HeaderCell from "../Reusable/HeaderCell";
import RowOpenPositions from "./RowOpenPositions";


const TableOpenPositions: FC = () => {

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
          />
        ))) : null}
      </tbody>

    </>
  );
}

export default TableOpenPositions;