import { Dispatch, FC, SetStateAction, useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

interface Props {
  showCallback: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const SellButtonCell: FC<Props> = ({ showCallback, id }) => {

  const { setIdToSell } = useContext(TransactionContext);

  const handleClick = () => {
    setIdToSell(id)
    showCallback(true);
  }

  return(
    <div className="flex justify-center">
      <button className="btn-sell px-4 py-1 text-sm rounded-md" onClick={handleClick}>
        Sell
      </button>
    </div>
  )
}

export default SellButtonCell;