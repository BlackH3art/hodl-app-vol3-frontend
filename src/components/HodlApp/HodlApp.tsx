import { FC, useContext, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import TransactionContextProvider, { TransactionContext } from "../../context/TransactionContext";
import TableHistory from "../TableHistory/TableHistory";
import TableOpenPositions from "../TableOpenPositions/TableOpenPositions";
import TableWallet from "../TableWallet/TableWallet";
import AddTransactionForm from "./AddTransactionForm";
import SumbMenu from "./SubMenu";


const HodlApp: FC = () => {

  const [showAddTransaction, setShowTransaction] = useState<boolean>(false);

  return(
    <TransactionContextProvider>
      <section className="relative w-full flex flex-col justify-center items-center min-h-[80vh]">

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
        
      </section>
    </TransactionContextProvider>
  )
}

export default HodlApp;