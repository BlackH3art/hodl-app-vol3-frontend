import { FC } from "react";
import { AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai';
import { FaHistory } from 'react-icons/fa';


const ActionCell: FC = () => {

  return(
    <div className="flex justify-center">
      <div className="mx-1">
        <button>
          <AiOutlineEdit />
        </button>
      </div>

      <div className="mx-1">
        <button>
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