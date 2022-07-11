import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import TransactionContextProvider from "../../context/TransactionContext";

import { getCoinsData } from "../../api";
import { setCoinsData } from "../../redux/features/coinsData-slice";
import { useDispatch } from 'react-redux';

import TableHistory from "../TableHistory/TableHistory";
import TableOpenPositions from "../TableOpenPositions/TableOpenPositions";
import TableWallet from "../TableWallet/TableWallet";
import AddTransactionForm from "./AddTransactionForm";
import SumbMenu from "./SubMenu";
import AddButton from "../Reusable/AddButton";


const HodlApp: FC = () => {

  const [showAddTransaction, setShowTransaction] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {

    async function getData() {

      const { data: coinsData } = await getCoinsData();
      
      dispatch(setCoinsData(coinsData));
    }
    
    // getData();

  }, []);

  return(
    <TransactionContextProvider>
      <section className="relative w-full flex flex-col items-center min-h-[80vh]">

        <SumbMenu showCallback={setShowTransaction} />

        {showAddTransaction && <AddTransactionForm showCallback={setShowTransaction} />}


        <div className="table-wraper w-full xl:w-3/4">
          <table className="w-full bg-gray-900" cellPadding="0" cellSpacing="0">
            <Routes>

              <Route path="positions" element={ <TableOpenPositions showCallback={setShowTransaction} />} />
              <Route path="wallet" element={ <TableWallet />} />
              <Route path="history" element={ <TableHistory />} />
              <Route path="history/:ticker" element={ <TableHistory />} />

            </Routes>
          </table>
        </div>


        <div className="absolute bottom-5 right-2 flex items-center justify-center">
          <AddButton showCallback={setShowTransaction} />
        </div>
        
      </section>
    </TransactionContextProvider>
  )
}

export default HodlApp;