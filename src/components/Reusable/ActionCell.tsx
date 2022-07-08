import { FC } from "react";
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai';
import { FaHistory } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTransaction } from "../../api";

interface Props {
  id: string;
  ticker: string;
}

const ActionCell: FC<Props> = ({ id, ticker }) => {

  const navigate = useNavigate();

  const handleDelete = async () => {

    try {
      
      console.log('id --> ', id);
      const { data } = await deleteTransaction(id);
      console.log('delete data -->', data);
      
      
    } catch (error: any) {
      console.log(error.message);
      
      toast.error("Deleting went wrong!", { theme: "colored" }); 
    }
  }

  return(
    <div className="flex justify-center">
      <div className="mx-1">
        <button>
          <AiOutlineEdit />
        </button>
      </div>

      <div className="mx-1">
        <button onClick={() => navigate(`../history/${ticker}`)}>
          <FaHistory />
        </button>
      </div>

      <div className="mx-1">
        <button onClick={handleDelete}>
          <AiTwotoneDelete />
        </button>
      </div>
    </div>
  );
}

export default ActionCell;