import { FC, useContext, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAverage } from "../../api";

import { TransactionContext } from "../../context/TransactionContext";
import { usdFormatter } from "../../helpers/usdFormatter";
import { CoinDataInterface } from "../../interfaces/CoinDataInterface";

import { AverageTransaction } from "../../interfaces/TransactionInterface";
import { RootState } from "../../redux/store";

interface Stats {
  totalCapital: number;
  totalCapitalInvested: number;
  percentPNL: number;
  dolarPNL: number;
}

const initialStats: Stats = {
  totalCapital: 0,
  totalCapitalInvested: 0,
  percentPNL: 0,
  dolarPNL: 0,
}

interface Props {
  addTransaction: boolean;
  deletedTransaction: boolean;
}

const Stats: FC<Props> = ({ addTransaction, deletedTransaction }) => {

  const { wallet, setWallet } = useContext(TransactionContext);
  const [stats, setStats] = useState<Stats>(initialStats);

  const coinsData: CoinDataInterface[] = useSelector<RootState, CoinDataInterface[]>((state) => state.coinsData.coinsData);



  useEffect(() => {

    if(wallet.length === 0) {
      getData();
    } else {
      calculateData(wallet);
    }

    async function getData() {
      try {
        const { data: averageItems } = await getAverage();
        setWallet(averageItems);
        calculateData(averageItems);
      } catch (error) {
        toast.error('Error fetching data', { theme: "colored" });     
      }
    }

  }, [addTransaction, deletedTransaction]);



  function calculateData(walletArray: AverageTransaction[]) {

    const walletWithCapital = walletArray.map((mapItem: AverageTransaction) => {

      const filteredDetailsArray: CoinDataInterface[] = coinsData.filter(coinData => coinData.ticker === mapItem._id.toUpperCase());
      const coinDetails = filteredDetailsArray[0];

      if(coinDetails) {
        mapItem.capital = mapItem.totalQuantity * coinDetails.currentPrice;
      }

      return mapItem
    });


    const totalCapital = walletWithCapital.reduce((accum, current) => {
      if(current.capital) {
        return accum + current.capital;
      } else {
        return accum;
      }
    }, 0);

    const totalCapitalInvested = walletWithCapital.reduce((accum, current) => {
      if(current.totalInvested) {
        return accum + current.totalInvested;
      } else {
        return accum;
      }
    }, 0);

    const percent = ((totalCapital - totalCapitalInvested) / totalCapitalInvested) * 100;
    const dolar = totalCapital - totalCapitalInvested;


    setStats({
      totalCapital,
      totalCapitalInvested,
      percentPNL: percent,
      dolarPNL: dolar,
    });
  }

  return (
    <section className="w-full xl:w-3/4 flex flex-col items-center pt-10">

      <div className="self-end text-myBlue px-5">

        <div className="flex">
          <div className="flex items-end px-5 text-lg font-semibold">
            {stats.percentPNL > 0 && (<><p className="flex items-center text-green-300 py-4"><FaCaretUp /> {`${stats.percentPNL.toFixed(2)}%`}</p></>)}
            {stats.percentPNL === 0 && (<><p className="text-gray-400 py-4">{`${stats.percentPNL.toFixed(2)}%`}</p></>)}
            {stats.percentPNL < 0 && (<><p className="flex items-center text-red-300 py-4"><FaCaretDown /> {`${Math.abs(stats.percentPNL).toFixed(2)}%`}</p></>)}
          </div>
          <h2 className="text-4xl font-bold py-4">
            {usdFormatter(stats.totalCapital)}
          </h2>
        </div>

        <div className="flex justify-end">

          <div className="flex flex-col w-1/3 items-end">
            <p className="text-gray-400 py-1">change:</p>
            <p className="text-gray-400 py-1">invested:</p>
          </div>

          <div className="flex flex-col w-1/2 items-end">
            {stats.dolarPNL > 0 && (<><p className="flex items-center text-green-300 py-1">{`${usdFormatter(stats.dolarPNL)}`}</p></>)}
            {stats.dolarPNL === 0 && (<><p className="text-gray-400 py-1">{`${usdFormatter(stats.dolarPNL)}`}</p></>)}
            {stats.dolarPNL < 0 && (<><p className="flex items-center text-red-300 py-1">{`${usdFormatter(stats.dolarPNL)}`}</p></>)}
            <p className="text-gray-300 py-1 font-semibold">{usdFormatter(stats.totalCapitalInvested)}</p>
          </div>

        </div>
        
      </div>
    </section>
  );
}
 
export default Stats;