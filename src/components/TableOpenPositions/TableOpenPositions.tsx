import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getAverage, getCoinsData, getTransactions } from "../../api";
import { TransactionContext } from "../../context/TransactionContext";
import { CoinDataInterface } from "../../interfaces/CoinDataInterface";
import { TransactionInterface } from "../../interfaces/TransactionInterface";
import { setCoinsData } from "../../redux/features/coinsData-slice";
import { RootState } from "../../redux/store";

import HeaderCell from "../Reusable/HeaderCell";
import LoadingRow from "../Reusable/LoadingRow";
import NoItemsRow from "../Reusable/NoItemsRow";
import RowOpenPositions from "./RowOpenPositions";

interface Props {
  showCallback: Dispatch<SetStateAction<boolean>>;
  setTransactionsCounter: Dispatch<SetStateAction<number>>;
}

const TableOpenPositions: FC<Props> = ({ showCallback, setTransactionsCounter }) => {

  const { transactions, setTransactions, loadingTable } = useContext(TransactionContext);
  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(false);
  

  useEffect(() => {
    setLoadingTransactions(true);
    async function fetchTransactions() {
      try {
        const { data } = await getTransactions();
        setTransactions(data);

      } catch (error) {
        setLoadingTransactions(false);
        toast.error("Problem fetching transactions data", { theme: "colored" });
      }
    }

    if(transactions.length === 0) {
      fetchTransactions();
    }
    setLoadingTransactions(false);
  }, []);

  const tableHeaders: string[] = [
    "#", "Ticker", "Price", "Capital", "Change", "PnL(%)", "Sell position", "Actions"
  ];

  return(
    <>
      <thead>
        <tr className="text-gray-200 border-b-[1px] border-gray-500">
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
        {loadingTransactions || loadingTable ? (
          <LoadingRow length={tableHeaders.length} />
        ) : transactions.filter(item => item.open === true).length ? (
          transactions.filter(item => item.open === true).map((item: TransactionInterface, index: number) => (
          <RowOpenPositions 
            id={item._id}
            key={index}
            nr={index + 1}
            ticker={item.ticker}
            entryPrice={item.entryPrice}
            quantity={item.quantity}
            showCallback={showCallback}
            setTransactionsCounter={setTransactionsCounter}
          />
        ))) : (
          <NoItemsRow length={tableHeaders.length} />
        )}
      </tbody>
    </>
  );
}

export default TableOpenPositions;