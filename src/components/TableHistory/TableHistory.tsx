import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getHistory } from "../../api";
import { TransactionContext } from "../../context/TransactionContext";
import { HistoryItemInterface } from "../../interfaces/HistoryItemInterface";

import HeaderCell from "../Reusable/HeaderCell";
import LoadingRow from "../Reusable/LoadingRow";
import NoItemsRow from "../Reusable/NoItemsRow";
import RowHistory from "./RowHistory";


const TableHistory: FC = () => {

  const { history, setHistory, loadingTable } = useContext(TransactionContext);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);

  const { ticker } = useParams();

  useEffect(() => {

    setLoadingHistory(true);
    async function fetchHistory() {
      try {
        const { data } = await getHistory();
        setHistory(data);
      } catch (error) {
        toast.error("Problem fetching history data", { theme: "colored" });
      }
    }

    fetchHistory();
    setLoadingHistory(false);

  }, []);

  const tableHeaders: string[] = [
    "#", "Ticker", "Type", "Date", "Price", "Amount", "Invested", "PnL($)"
  ];

  const historyItemsArray = history ? (
    ticker ? history.filter(item => item.ticker === ticker) : history
  ) : ([]);


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
        {loadingHistory || loadingTable ? (
          <LoadingRow length={tableHeaders.length} />
        ) : historyItemsArray.length ? historyItemsArray.map((item: HistoryItemInterface, index: number) => (
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
        )) : (
          <NoItemsRow length={tableHeaders.length} />
        )}
      </tbody>

    </>
  );
}

export default TableHistory;