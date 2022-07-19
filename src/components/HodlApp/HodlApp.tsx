import { FC, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TransactionContextProvider, { TransactionContext } from "../../context/TransactionContext";

import { getAverage, getCoinsData } from "../../api";
import { setCoinsData } from "../../redux/features/coinsData-slice";
import { useDispatch } from 'react-redux';

import TableHistory from "../TableHistory/TableHistory";
import TableOpenPositions from "../TableOpenPositions/TableOpenPositions";
import TableWallet from "../TableWallet/TableWallet";
import AddTransactionForm from "./AddTransactionForm";
import SumbMenu from "./SubMenu";
import AddButton from "../Reusable/AddButton";
import Stats from "../Stats/Stats";

import { CoinDataInterface } from "../../interfaces/CoinDataInterface";
import { AverageTransaction } from "../../interfaces/TransactionInterface";
import { toast } from "react-toastify";

export interface Statistics {
  totalCapital: number;
  totalCapitalInvested: number;
  percentPNL: number;
  dolarPNL: number;
}

const initialStats: Statistics = {
  totalCapital: 0,
  totalCapitalInvested: 0,
  percentPNL: 0,
  dolarPNL: 0,
}

export interface ChartData {
  name: string;
  value: number | string;
  text: string;
}


const HodlApp: FC = () => {

  const [showAddTransaction, setShowTransaction] = useState<boolean>(false);
  const [stats, setStats] = useState<Statistics>(initialStats);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [transactionsCounter, setTransactionsCounter] = useState<number>(0);
  const [loadingStats, setLoadingStats] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { setWallet } = useContext(TransactionContext);

  
  async function getWalletAverage() {

    let averageItems: AverageTransaction[];

    const { data } = await getAverage();
    averageItems = data;
    setWallet(averageItems);
    
    return averageItems;
  }

  async function getCoinsDetails() {

    let coinsData: CoinDataInterface[];

    const { data } = await getCoinsData();
    coinsData = data;
    dispatch(setCoinsData(coinsData));

    return coinsData;
  }
  


  useEffect(() => {

    setLoadingStats(true);

    async function getStatisticsData() {

      setChartData([]);
      // fetch data
      const coinDetails = await getCoinsDetails();
      const averageTransactions = await getWalletAverage();

      // add capital to each specific item
      const averageWithCapital = averageTransactions.map((mapItem: AverageTransaction) => {

        const filteredMapItemDetails = coinDetails.filter(coinData => coinData.ticker === mapItem._id.toUpperCase());
        const mapItemDetails = filteredMapItemDetails[0];

        mapItem.capital = mapItem.totalQuantity * mapItemDetails.currentPrice;
        
        return mapItem;
      });

      
      
      // sum of capital from each spcific item
      const totalCapital = averageWithCapital.reduce((accum, current) => {
        if(current.capital) {
          return accum + current.capital;
        } else {
          return accum;
        }
      }, 0);
      
      // sum of total invested from each specific item
      const totalCapitalInvested = averageWithCapital.reduce((accum, current) => {
        if(current.totalInvested) {
          return accum + current.totalInvested;
        } else {
          return accum;
        }
      }, 0);

      // create chartData based on average array with capital
      averageWithCapital.forEach(item => {

        if(item.capital) {
          
          const chartDataObject: ChartData = {
            name: item._id.toUpperCase(),
            value: ((item.capital * 100) / totalCapital).toFixed(2),
            text: `${item._id.toUpperCase()} - ${((item.capital * 100) / totalCapital).toFixed(2)}%`
          };

          setChartData((state) => [...state, chartDataObject]);
        }
      })

      // calculate dolar and percent pnl
      const percent = ((totalCapital - totalCapitalInvested) / totalCapitalInvested) * 100;
      const dolar = totalCapital - totalCapitalInvested;

      setStats({
        totalCapital,
        totalCapitalInvested,
        percentPNL: percent,
        dolarPNL: dolar,
      });
      setLoadingStats(false);
    }

    try {
      getStatisticsData();
      
    } catch (error) {
      setLoadingStats(false);
      toast.error('Unexpected error', { theme: "colored" });
    }
    
  }, [transactionsCounter]);


  return(
    <TransactionContextProvider>
      <section className="w-full flex flex-col items-center min-h-[80vh]">
        
        <Stats stats={stats} chartData={chartData} loadingStats={loadingStats} />

        <SumbMenu showCallback={setShowTransaction} />

        {showAddTransaction && <AddTransactionForm showCallback={setShowTransaction} setTransactionsCounter={setTransactionsCounter} setLoadingStats={setLoadingStats} />}


        <div className="table-wraper w-full xl:w-3/4">
          <table className="w-full glass1" cellPadding="0" cellSpacing="0">
            <Routes>

              <Route path="positions" element={ <TableOpenPositions showCallback={setShowTransaction} setTransactionsCounter={setTransactionsCounter}  />} />
              <Route path="wallet" element={ <TableWallet />} />
              <Route path="history" element={ <TableHistory />} />
              <Route path="history/:ticker" element={ <TableHistory />} />

              <Route path="*" element={ <Navigate to="positions" />} />

            </Routes>
          </table>
        </div>


        <div className="absolute md:hidden bottom-5 right-2 flex items-center justify-center">
          <AddButton showCallback={setShowTransaction} />
        </div>
        
      </section>
    </TransactionContextProvider>
  )
}

export default HodlApp;