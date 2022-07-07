import { FC } from "react";
import { averageWallet } from "../../helpers/mockData";
import { WalletItemInterface } from "../../interfaces/WalletItemInterface";
import HeaderCell from "../Reusable/HeaderCell";
import RowWallet from "./RowWallet";


const TableWallet: FC = () => {

  const averageTransactions = averageWallet;

  const tableHeaders: string[] = [
    "#", "Coin", "Ticker", "Price", "1h", "24h", "7 days", "Shares", "Profit/Loss"
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
        {averageTransactions.map((item: WalletItemInterface, index: number) => (
          <RowWallet 
            key={index}
            nr={index + 1}
            name={item.name}
            ticker={item.ticker}
            totalAmount={item.totalAmount}
            averagePrice={item.averagePrice}
          />
        ))}
      </tbody>

    </>
  );
}

export default TableWallet;