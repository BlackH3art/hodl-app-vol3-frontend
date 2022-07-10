import { createContext, FC, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { getAverage, getHistory, getTransactions } from "../api";
import { HistoryItemInterface } from "../interfaces/HistoryItemInterface";
import { TransactionContextInterface } from "../interfaces/TransactionContextInterface";
import { AverageTransaction, TransactionInterface } from "../interfaces/TransactionInterface";


export const TransactionContext = createContext<TransactionContextInterface>({
  idToEdit: null,
  setIdToEdit: () => {},
  transactions: [],
  setTransactions: () => {},
  wallet: [],
  setWallet: () => {},
  history: [],
  setHistory: () => {},
});

interface Props {
  children: ReactNode;
}

const TransactionContextProvider: FC<Props> = ({ children }) => {

  const [idToEdit, setIdToEdit] = useState<string | null>(null);

  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [wallet, setWallet] = useState<AverageTransaction[]>([]);
  const [history, setHistory] = useState<HistoryItemInterface[]>([]);



  return(
    <TransactionContext.Provider value={{
      idToEdit,
      setIdToEdit,
      transactions,
      setTransactions,
      wallet,
      setWallet,
      history,
      setHistory,
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionContextProvider;