import { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getCoinsData, getHistory } from "../../api";
import { TransactionContext } from "../../context/TransactionContext";
import { CoinDataInterface } from "../../interfaces/CoinDataInterface";
import { HistoryItemInterface } from "../../interfaces/HistoryItemInterface";
import { setCoinsData } from "../../redux/features/coinsData-slice";
import { RootState } from "../../redux/store";

import HeaderCell from "../Reusable/HeaderCell";
import LoadingRow from "../Reusable/LoadingRow";
import NoItemsRow from "../Reusable/NoItemsRow";
import RowHistory from "./RowHistory";


const TableHistory: FC = () => {

  const { history, setHistory, loadingTable } = useContext(TransactionContext);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);

  const { ticker } = useParams();

  const coinsData: CoinDataInterface[] = useSelector<RootState, CoinDataInterface[]>((state) => state.coinsData.coinsData);

  const dispatch = useDispatch();

  useEffect(() => {

    async function getData() {
      const { data: coinsData } = await getCoinsData();
      dispatch(setCoinsData(coinsData));
    }
    
    if(coinsData.length === 0) {
      getData();
    }

  }, []);

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
        <tr className="text-gray-200 border-b-[1px] border-gray-500">
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
        ) : historyItemsArray.length ? historyItemsArray.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).map((item: HistoryItemInterface, index: number) => (
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