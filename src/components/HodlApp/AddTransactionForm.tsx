import { ChangeEvent, ChangeEventHandler, Dispatch, FC, SetStateAction, useState } from "react";

import MyErrorInput from "../Reusable/MyErrorInput";


interface FormData {
  ticker: string;
  amount: number | string;
  entryPrice: number | string;
  type: "buy" | "sell";
}

const initialFormData: FormData = {
  ticker: "",
  amount: "",
  entryPrice: "",
  type: "buy"
}

interface FormValidationError {
  ticker: string;
  amount: string;
  entryPrice: string;
}

const initialError: FormValidationError = {
  ticker: "",
  amount: "",
  entryPrice: "",
}

interface Props {
  showCallback: Dispatch<SetStateAction<boolean>>
}


const AddTransactionForm: FC<Props> = ({ showCallback }) => {

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<FormValidationError>(initialError);



  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {

    setError(initialError);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = () => {}


  return (
    <div className="glass2 absolute w-full h-screen flex items-center justify-center">

      <div className="flex flex-col w-full md:w-[60%] lg:w-1/4 xl:w-1/5 lg:border-[1px] border-gray-700 bg-main">
        <form className="w-full flex flex-col items-center text-white pb-16">

          <div className={`w-full flex font-bold border-[1px] border-gray-700 ${formData.type === "buy" ? "bg-green-500" : "bg-red-400"}`}>
            <button type="button" className={`w-1/2 py-5 px-5 rounded-br-[2rem] ${formData.type === "buy" ? "bg-transparent font-semibold" : "bg-[#131722] font-light text-gray-400"}`} onClick={() => setFormData({ ...initialFormData, type: "buy"})}>
              buy
            </button>
            <button type="button" className={`w-1/2 py-5 px-5 rounded-bl-[2rem] ${formData.type !== "buy" ? "bg-transparent font-semibold" : "bg-[#131722] font-light text-gray-400"}`} onClick={() => setFormData({ ...initialFormData, type: "sell"})}>
              sell
            </button>
          </div>

          <MyErrorInput 
            name="ticker"
            type="text"
            placeholder="Ticker"
            error={error.ticker}
            handler={handleChange}
            value={formData.ticker}
          />

          <MyErrorInput 
            name="amount"
            type="number"
            placeholder="Amount"
            error={error.amount}
            handler={handleChange}
            value={formData.amount}
          />

          <MyErrorInput 
            name="entryPrice"
            type="number"
            placeholder="Entry price"
            error={error.entryPrice}
            handler={handleChange}
            value={formData.entryPrice}
          />


          <button className={`${formData.type === "buy" ? "bg-green-500" : "bg-red-400" } w-4/5 py-3 mt-5 rounded-[.5rem] `} onClick={handleSubmit}>
            {formData.type === "buy" ? "BUY" : "SELL"}
          </button>

          <button className={`w-4/5 py-3 mt-5 rounded-[.5rem] border-[1px] border-gray-700`} onClick={() => showCallback(false)}>
            Cancel
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddTransactionForm;