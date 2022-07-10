import { FC } from "react";

interface Props {
  length: number;
}

const NoItemsRow: FC<Props> = ({ length }) => {

  return(
    <tr className="row text-gray-400 border-b-[1px] border-gray-800">
      <td className="h-32 py-12" colSpan={length}>

        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold py-2">
            You have no transactions yet
          </h2>
          <p className="text-sm">
            Add some transactions that you want to track.
          </p>
        </div>

      </td>
    </tr>
  );
}

export default NoItemsRow;