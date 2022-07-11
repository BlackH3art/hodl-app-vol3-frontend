import { Dispatch, FC, SetStateAction } from "react";
import { MdAdd } from 'react-icons/md';

interface Props {
  showCallback: Dispatch<SetStateAction<boolean>>
}

const AddButton: FC<Props> = ({ showCallback }) => {

  return(
    <button className="rounded-full w-10 h-10 bg-blue-300 flex justify-center items-center bg-green-400" onClick={() => showCallback(true)}>
      <MdAdd color="white" size="1.8rem" />
    </button>
  )
}

export default AddButton;