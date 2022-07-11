import { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getAverage, getCoinsData } from "../../api";
import { TransactionContext } from "../../context/TransactionContext";
import { CoinDataInterface } from "../../interfaces/CoinDataInterface";
import { AverageTransaction } from "../../interfaces/TransactionInterface";
import { setCoinsData } from "../../redux/features/coinsData-slice";
import { RootState } from "../../redux/store";

import HeaderCell from "../Reusable/HeaderCell";
import LoadingRow from "../Reusable/LoadingRow";
import NoItemsRow from "../Reusable/NoItemsRow";
import RowWallet from "./RowWallet";


const TableWallet: FC = () => {

  const { setWallet, wallet, loadingTable } = useContext(TransactionContext);
  const [loadingWallet, setLoadingWallet] = useState<boolean>(false);

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

    setLoadingWallet(true);
    async function fetchWallet() {
      try {
        const { data } = await getAverage();
        setWallet(data);
      } catch (error) {
        toast.error("Problem fetching wallet data", { theme: "colored" });
      }
    }

    fetchWallet();
    setLoadingWallet(false);
    
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
        {loadingWallet || loadingTable ? (

          <LoadingRow length={tableHeaders.length} />

        ) : !wallet.length ? (

          <NoItemsRow length={tableHeaders.length} />

        ) : wallet.map((item: AverageTransaction, index: number) => (

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