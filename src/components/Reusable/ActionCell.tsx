import { FC } from "react";
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai';
import { FaHistory } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  ticker: string;
}

const ActionCell: FC<Props> = ({ id, ticker }) => {

  const navigate = useNavigate();

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
        <button>
          <AiTwotoneDelete />
        </button>
      </div>
    </div>
  );
}

export default ActionCell;