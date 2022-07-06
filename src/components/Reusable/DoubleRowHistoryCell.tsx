import { FC } from "react";

interface Props {
  text1?: string;
  text2?: string;
  value1: number | string;
  value2: number | string;
  secondRow: boolean;
}

const DoubleROwHistoryCell: FC<Props> = ({ text1, text2, value1, value2, secondRow }) => {

  return(
    <div className="flex">

      {secondRow ? (
        <>
          <div className="pre-text-box text-right w-3/5">
            <p className="font-light text-right pr-3 text-gray-500">{text1}</p>
            <p className="font-light text-right pr-3 text-gray-500">{text2}</p>
          </div>

          <div className="value-text-box text-right w-full pr-5">
            <p className="text-gray-400">{value1}</p>
            <p className="text-gray-400">{value2}</p>
          </div>
        </>
      ) : (
        <>
          <div className="pre-text-box text-right py-3 w-3/5">
            <p className="font-light text-right pr-3 text-gray-500">{text1}</p>
          </div>

          <div className="value-text-box text-right py-3 w-full pr-5">
            <p className="text-gray-400">{value1}</p>
          </div>
        </>
      )}

    </div>
  )
}

export default DoubleROwHistoryCell;