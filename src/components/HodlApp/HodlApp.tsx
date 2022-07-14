import { FC, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import Stats from "../Stats/Stats";


const HodlApp: FC = () => {

  const [showAddTransaction, setShowTransaction] = useState<boolean>(false);
  const [deletedTransaction, setDeletedTransaction] = useState<boolean>(false);



  return(
    <TransactionContextProvider>
      <section className="w-full flex flex-col items-center min-h-[80vh]">

        <Stats addTransaction={showAddTransaction} deletedTransaction={deletedTransaction} />

        <SumbMenu showCallback={setShowTransaction} />

        {showAddTransaction && <AddTransactionForm showCallback={setShowTransaction} />}


        <div className="table-wraper w-full xl:w-3/4">
          <table className="w-full glass1" cellPadding="0" cellSpacing="0">
            <Routes>

              <Route path="positions" element={ <TableOpenPositions showCallback={setShowTransaction} setDeletedTransaction={setDeletedTransaction} />} />
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