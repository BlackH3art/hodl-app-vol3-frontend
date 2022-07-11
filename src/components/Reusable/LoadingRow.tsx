import { FC } from "react";
import { ClipLoader } from 'react-spinners';


interface Props {
  length: number;
}

const LoadingRow: FC<Props> = ({ length }) => {


  const items: number[] = [];

  for(let i = 1; i <= length - 1; i++) {
    items.push(i);
  }

  return(
    <tr className="row text-gray-400 border-b-[1px] border-gray-800">

      <td>
        <p className="text-center">-</p>
      </td>

      {items.map(item => (
        <td className="py-5" key={item}>
          <div className="flex justify-center">
            <ClipLoader color="#797979"/>
          </div>
        </td>
      ))}
    </tr>
  )
}

export default LoadingRow;