import { FC, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import TableHistory from "../TableHistory/TableHistory";
import TableOpenPositions from "../TableOpenPositions/TableOpenPositions";
import TableWallet from "../TableWallet/TableWallet";
import AddTransactionForm from "./AddTransactionForm";
import SumbMenu from "./SubMenu";


const HodlApp: FC = () => {

  const [showAddTransactionForm, setShowAddTransaction] = useState(false);

  return(
    <section className="relative w-full flex flex-col justify-center items-center min-h-[80vh]">

      <SumbMenu showCallback={setShowAddTransaction} />

      {showAddTransactionForm && <AddTransactionForm showCallback={setShowAddTransaction} />}



      <div className="table-wraper w-full xl:w-3/4">

        <table className="w-full bg-gray-900" cellPadding="0" cellSpacing="0">
          <Routes>

            <Route path="positions" element={ <TableOpenPositions />} />
            <Route path="wallet" element={ <TableWallet />} />
            <Route path="history" element={ <TableHistory />} />

          </Routes>
        </table>

      </div>
      
    </section>
  )
}

export default HodlApp;