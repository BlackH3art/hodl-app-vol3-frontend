import { FC, useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getHistory } from "../../api";
import { TransactionContext } from "../../context/TransactionContext";
import { HistoryItemInterface } from "../../interfaces/HistoryItemInterface";
import HeaderCell from "../Reusable/HeaderCell";
import RowHistory from "./RowHistory";


const TableHistory: FC = () => {

  const { history, setHistory } = useContext(TransactionContext);
  const { ticker } = useParams();
  const location = useLocation();

  useEffect(() => {
    console.log('location --> ', location);
    
    async function fetchHistory() {
      const { data } = await getHistory();
      setHistory(data);
    }
    fetchHistory();
  }, []);

  const tableHeaders: string[] = [
    "#", "Ticker", "Type", "Date", "Price", "Amount", "Invested", "PnL($)"
  ];

  const historyItemsArray = history ? (
    ticker ? history.filter(item => item.ticker === ticker) : history
  ) : (null);


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
        {historyItemsArray ? historyItemsArray.map((item: HistoryItemInterface, index: number) => (
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