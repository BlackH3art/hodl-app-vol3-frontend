import { Dispatch, FC, SetStateAction, useContext } from "react";
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai';
import { FaHistory } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTransaction, getAverage, getHistory, getTransactions } from "../../api";
import { TransactionContext } from "../../context/TransactionContext";

interface Props {
  id: string;
  ticker: string;
  showCallback: Dispatch<SetStateAction<boolean>>;
  setTransactionsCounter: Dispatch<SetStateAction<number>>;
}

const ActionCell: FC<Props> = ({ id, ticker, showCallback, setTransactionsCounter }) => {

  const { setIdToEdit, setHistory, setTransactions, setWallet } = useContext(TransactionContext);
  
  const navigate = useNavigate();

  const handleEdit = () => {
    
    setIdToEdit(id);
    showCallback(true);
  }

  const handleDelete = async () => {

    try {
      const { data } = await deleteTransaction(id);

      const { data: historyItems } = await getHistory();
      setHistory(historyItems);
      const { data: transactionItems } = await getTransactions();
      setTransactions(transactionItems);
      const { data: averageItems } = await getAverage();
      setWallet(averageItems);

      setTransactionsCounter(state => state + 1);

      if(data.ok) {
        toast.success("Deleted transaction", { theme: "colored" });
      } else {
        toast.error(data.msg, { theme: "colored" })
      }
      
    } catch (error: any) {
      console.log(error.message);
      
      toast.error("Deleting went wrong!", { theme: "colored" }); 
    }
  }

  return(
    <div className="flex justify-center">
      <div className="mx-1">
        <button onClick={handleEdit}>
          <AiOutlineEdit size="1.1rem" />
        </button>
      </div>

      <div className="mx-1">
        <button onClick={() => navigate(`../history/${ticker}`)}>
          <FaHistory size="1.1rem" />
        </button>
      </div>

      <div className="mx-1">
        <button onClick={handleDelete}>
          <AiTwotoneDelete size="1.1rem" />
        </button>
      </div>
    </div>
  );
}

export default ActionCell;