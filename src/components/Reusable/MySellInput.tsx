import { ChangeEvent, ChangeEventHandler, FC, FormEventHandler, useContext, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { toast } from "react-toastify";

import { getMaxTickerAmount, getMaxTransactionAmount } from "../../api";
import { TransactionContext } from "../../context/TransactionContext";
import { MyResponse } from "../../interfaces/MyResponse";

interface Props {
  name: string; 
  type: string;
  placeholder: string;
  value: number | string;
  error: string;
  handler: ChangeEventHandler;
  ticker: string;
  setAllCallback: (amount: number) => void;
}

const MySellInput: FC<Props> = ({name, type, placeholder, error, value, handler, ticker, setAllCallback }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const { idToSell } = useContext(TransactionContext);


  const handleGetAll: FormEventHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log('click');
    
    setLoading(true);
    try {
      let response: MyResponse;
      
      if(idToSell) {
        // fetch single max
        const { data }: { data: MyResponse } = await getMaxTransactionAmount(idToSell);
        response = data;
        
        if (response.ok) setAllCallback(response.data.maxAmount);
      } else if(ticker) {
        // fetch coin max
        const { data }: { data: MyResponse } = await getMaxTickerAmount(ticker);
        response = data;

        console.log(response);
        if (response.ok) setAllCallback(response.data[0].maxAmount);
      } else {
        toast.error('Coin not found', { theme: "colored" });
      }

      setLoading(false);


    } catch (error: any) {
      setLoading(false);
      toast.error('Something went wrong', { theme: "colored" });
    }
  }

  return (
    <div className="w-3/5">
      <label className={`${error ? 'error-input' : ''} my-label flex items-center px-5 py-2 mt-4`}>
        <input 
          className="my-input w-3/4" 
          name={name} 
          type={type}
          placeholder={placeholder} 
          value={value}
          onChange={handler}
          autoComplete="off"
          min={0}
        />
        
        <button 
          className="btn-all w-1/4 flex items-center justify-center py-3 uppercase text-[.7rem] font-semibold text-gray-400" 
          onClick={handleGetAll}
        >
          {loading ? (<ClipLoader color="#797979" size="1.1rem" />) : (<p className="">all</p>)}
        </button>
      </label>

      <p className="text-red-500 font-regular text-sm text-center">
        {error}
      </p>
    </div>
  );
}

export default MySellInput;