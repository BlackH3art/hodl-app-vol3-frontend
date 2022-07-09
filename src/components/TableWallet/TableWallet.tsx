import { FC, useContext, useEffect } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { AverageTransaction } from "../../interfaces/TransactionInterface";
import HeaderCell from "../Reusable/HeaderCell";
import RowWallet from "./RowWallet";


const TableWallet: FC = () => {

  const { fetchWallet, wallet } = useContext(TransactionContext);

  useEffect(() => {

    fetchWallet();
    
  }, []);

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
        {wallet.map((item: AverageTransaction, index: number) => (
          <RowWallet 
            key={index}
            nr={index + 1}
            ticker={item._id}
            quantitySum={item.quantitySum}
            averagePrice={item.averagePrice}
          />
        ))}
      </tbody>

    </>
  );
}

export default TableWallet;