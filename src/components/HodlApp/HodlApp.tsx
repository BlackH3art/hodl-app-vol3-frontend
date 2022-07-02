import { FC, useState } from "react";
import { Link } from "react-router-dom";
import AddTransactionForm from "./AddTransactionForm";
import SumbMenu from "./SubMenu";


const HodlApp: FC = () => {

  const [showAddTransactionForm, setShowAddTransaction] = useState(false);

  return(
    <section className="relative w-full flex flex-col justify-center items-center min-h-[80vh]">

      <SumbMenu showCallback={setShowAddTransaction} />

      {showAddTransactionForm && <AddTransactionForm showCallback={setShowAddTransaction} />}


      <h1 className="text-6xl">
        app
      </h1>
      
    </section>
  )
}

export default HodlApp;