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
  fetchTransactions: async () => {},
  wallet: [],
  fetchWallet: async () => {},
  history: [],
  fetchHistory: async () => {}
});

interface Props {
  children: ReactNode;
}

const TransactionContextProvider: FC<Props> = ({ children }) => {

  const [idToEdit, setIdToEdit] = useState<string | null>(null);

  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [wallet, setWallet] = useState<AverageTransaction[]>([]);
  const [history, setHistory] = useState<HistoryItemInterface[]>([]);



  const fetchTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data);
      
    } catch (error: any) {
      console.log('error fetch transactions');
      console.log(error.message);
      toast.error("Couldn't get transactions", { theme: "colored" });
    }
  }

  const fetchWallet = async () => {
    try {
      const { data } = await getAverage();
      setWallet(data);
      
    } catch (error: any) {
      console.log('error fetch wallet');
      console.log(error.message);
      toast.error("Couldn't get wallet", { theme: "colored" });
    }
  }

  const fetchHistory = async () => {
    try {
      const { data } = await getHistory();
      setHistory(data);
      
    } catch (error: any) {
      console.log('error fetch history');
      console.log(error.message);
      toast.error("Couldn't get history", { theme: "colored" });
    }
  }

  return(
    <TransactionContext.Provider value={{
      idToEdit,
      setIdToEdit,
      transactions,
      fetchTransactions,
      wallet,
      fetchWallet,
      history,
      fetchHistory,
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionContextProvider;