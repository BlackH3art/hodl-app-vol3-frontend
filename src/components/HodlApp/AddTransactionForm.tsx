import { ChangeEvent, ChangeEventHandler, Dispatch, FC, FormEvent, FormEventHandler, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners';

import { addTransaction, editTransaction, getAverage, getCoinData, getHistory, getTransactions, sellTransaction } from "../../api";
import { MyResponse } from "../../interfaces/MyResponse";

import MyErrorInput from "../Reusable/MyErrorInput";
import { TransactionContext } from "../../context/TransactionContext";
import { CoinDataInterface } from "../../interfaces/CoinDataInterface";

import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addCoinData } from "../../redux/features/coinsData-slice";
import MySellInput from "../Reusable/MySellInput";
import { validateAddTransaction } from "../../helpers/validateAddTransaction";


export interface TransactionData {
  ticker: string;
  quantity: number | string;
  price: number | string;
  type: "buy" | "sell";
  date: Date | null;
}

const initialTransactionData: TransactionData = {
  ticker: "",
  quantity: "",
  price: "",
  type: "buy",
  date: null
}

export interface FormValidationError {
  ticker: string;
  amount: string;
  price: string;
}

const initialError: FormValidationError = {
  ticker: "",
  amount: "",
  price: "",
}

interface Props {
  showCallback: Dispatch<SetStateAction<boolean>>;
  setTransactionsCounter: Dispatch<SetStateAction<number>>;
  setLoadingStats: Dispatch<SetStateAction<boolean>>;
}


const AddTransactionForm: FC<Props> = ({ showCallback, setTransactionsCounter, setLoadingStats }) => {

  const [transactionData, setTransactionData] = useState<TransactionData>(initialTransactionData);
  const [error, setError] = useState<FormValidationError>(initialError);
  const [loading, setLoading] = useState<boolean>(false);
  const { idToEdit, setIdToEdit, idToSell, setIdToSell, transactions, setHistory, setTransactions, setWallet, setLoadingTable } = useContext(TransactionContext);

  const coinsData: CoinDataInterface[] = useSelector<RootState, CoinDataInterface[]>((state) => state.coinsData.coinsData);

  const dispatch = useDispatch();

  useEffect(() => {

    if(idToEdit && transactions) {

      const transactionToEdit = transactions.filter(item => item._id === idToEdit);
      const { ticker, quantity, entryPrice, openDate, type } = transactionToEdit[0];

      setTransactionData({
        ticker: ticker,
        quantity: quantity,
        price: entryPrice,
        type: type,
        date: openDate
      });
    }


    if(idToSell && transactions) {

      const transactionToSell = transactions.filter(item => item._id === idToSell);
      const { ticker, openDate } = transactionToSell[0];

      setTransactionData({
        ticker: ticker,
        quantity: "",
        price: "",
        type: "sell",
        date: openDate
      });
    }
  }, [])

  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {

    setError(initialError);

    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoadingTable(true);
    setLoadingStats(true);

    setError(validateAddTransaction(transactionData));

    const isError = validateAddTransaction(transactionData);
    setError(isError);

    if(isError.ticker || isError.amount || isError.price) {

      setLoading(false);
      setLoadingTable(false);
      setLoadingStats(false);
      return;
    }

    try {
      let response: MyResponse;

      const { data: coinData }: { data: CoinDataInterface } = await getCoinData(transactionData.ticker);
      if(!coinsData.find(item => item.ticker === coinData.ticker)) {
        dispatch(addCoinData(coinData));
      }

      if(idToEdit) {
        const { data }: { data: MyResponse } = await editTransaction(idToEdit, transactionData);
        response = data;

      } else if(idToSell) {
        const { data }: { data: MyResponse } = await sellTransaction(idToSell, transactionData)
        response = data;

      } else {
        const { data }: { data: MyResponse} = await addTransaction({
          ...transactionData,
          date: new Date(),
        });
        response = data;
      }
  
      if(response.ok) {

        const { data: historyItems } = await getHistory();
        setHistory(historyItems);
        const { data: transactionItems } = await getTransactions();
        setTransactions(transactionItems);
        const { data: averageItems } = await getAverage();
        setWallet(averageItems);

        setLoading(false);
        setLoadingTable(false);
        setLoadingStats(false);

        setTransactionsCounter(state => state + 1);
        setIdToSell(null);
        setIdToEdit(null);
        setError(initialError);
        setTransactionData(initialTransactionData);
        showCallback(false);
        
        if(idToEdit) {
          toast.success("Transaction saved", { theme: "colored" }); 
        } else {
          toast.success("Transaction added", { theme: "colored" }); 
        }
        return;

      } else {
        
        setLoading(false);
        setLoadingTable(false);
        setLoadingStats(false);
        toast.error(response.msg, { theme: "colored" }); 
        return;
      }

    } catch (err: any) {
      setLoading(false);
      setLoadingTable(false);
      setLoadingStats(false);

      if(err.response.data.msg === "Coin not found") {
        setError({
          ...error,
          ticker: "Coin not found"
        });
      } else {
        toast.error("Something went wrong.", { theme: "colored" }); 
      }
      
    }
    
  }

  const handleCancel = () => {
    setError(initialError);
    setIdToSell(null);
    setIdToEdit(null);
    showCallback(false);
  }

  const handleChangeType = (type: "buy" | "sell") => {
    setError(initialError);
    setIdToEdit(null);
    setIdToSell(null);
    setTransactionData({ ...initialTransactionData, type: type});
  }

  const handleSetAll = (amount: number) => {
    setTransactionData({
      ...transactionData,
      quantity: amount
    });
    setError({
      ...error,
      amount: ""
    })
  }


  return (
    <div className="glass2 fixed top-0 w-full h-screen flex items-center justify-center z-10">

      <div className="flex flex-col w-full md:w-[60%] lg:w-1/4 xl:w-1/5 lg:border-[1px] border-gray-700 bg-main">
        <form className="w-full flex flex-col items-center text-white pb-16">

          <div className={`w-full flex font-bold border-[1px] border-gray-700 ${transactionData.type === "buy" ? "bg-green-500" : "bg-red-400"}`}>
            <button type="button" className={`w-1/2 py-5 px-5 rounded-br-[2rem] ${transactionData.type === "buy" ? "bg-transparent font-semibold" : "bg-[#131722] font-light text-gray-400"}`} onClick={() => handleChangeType("buy")}>
              buy
            </button>
            <button type="button" className={`w-1/2 py-5 px-5 rounded-bl-[2rem] ${transactionData.type !== "buy" ? "bg-transparent font-semibold" : "bg-[#131722] font-light text-gray-400"}`} onClick={() => handleChangeType("sell")}>
              sell
            </button>
          </div>

          <MyErrorInput 
            name="ticker"
            type="text"
            placeholder="Ticker"
            error={error.ticker}
            handler={handleChange}
            value={transactionData.ticker}
          />

          {transactionData.type === "buy" ? (
            <MyErrorInput 
              name="quantity"
              type="number"
              placeholder="Amount"
              error={error.amount}
              handler={handleChange}
              value={transactionData.quantity}
            />
          ) : (
            <MySellInput  
              name="quantity"
              type="number"
              placeholder="Amount"
              error={error.amount}
              handler={handleChange}
              value={transactionData.quantity}
              ticker={transactionData.ticker}
              setAllCallback={handleSetAll}
            />
          )}

          <MyErrorInput 
            name="price"
            type="number"
            placeholder="Price"
            error={error.price}
            handler={handleChange}
            value={transactionData.price}
          />


          <button className={`${transactionData.type === "buy" ? "bg-green-500" : "bg-red-400" } w-4/5 py-3 mt-5 rounded-[.5rem] `} onClick={handleSubmit}>
            {loading ? <ClipLoader size="1rem" color="white" /> : transactionData.type === "buy" ? (idToEdit ? "SAVE" : "BUY" ) : (idToEdit ? "SAVE" : "SELL")}
          </button>

          <button className={`w-4/5 py-3 mt-5 rounded-[.5rem] border-[1px] border-gray-700`} onClick={handleCancel}>
            Cancel
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddTransactionForm;