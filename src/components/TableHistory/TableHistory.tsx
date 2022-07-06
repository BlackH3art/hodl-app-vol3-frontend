import { FC, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { HistoryItemInterface } from "../../interfaces/HistoryItemInterface";
import HeaderCell from "../Reusable/HeaderCell";
import RowHistory from "./RowHistory";


const TableHistory: FC = () => {

  const { user } = useContext(UserContext);

  const tableHeaders: string[] = [
    "#", "Ticker", "Type", "Date", "Price", "Amount", "Invested", "PnL($)"
  ];

  return(
    <>
      <thead>
        <tr className="text-gray-300 border-b-[1px] border-gray-500">
          {tableHeaders.map((header: string, index: number) => (
            <HeaderCell key={index}>
              <p>
                {header}
              </p>
            </HeaderCell>
          ))}
        </tr>
      </thead>

      <tbody>
        {user ? user.history.map((item: HistoryItemInterface, index: number) => (
          <RowHistory 
            nr={index + 1}
            key={index}
            ticker={item.ticker}
            type={item.type}
            sellingPrice={item.sellingPrice}
            entryPrice={item.entryPrice}
            quantity={item.quantity}
            sellingQuantity={item.sellingQuantity}
            invested={item.invested}
            gain={item.gain}
            openDate={item.openDate}
            closeDate={item.closeDate}
          />
        )) : null}
      </tbody>

    </>
  );
}

export default TableHistory;