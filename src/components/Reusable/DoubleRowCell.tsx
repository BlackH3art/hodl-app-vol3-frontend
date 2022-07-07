import { FC, ReactNode } from "react";

interface Props {
  text1?: string;
  text2?: string;
  value1: number | string | ReactNode;
  value2: number | string | ReactNode;
  pretext: boolean
}

const DoubleRowCell: FC<Props> = ({ text1, text2, value1, value2, pretext }) => {

  return(
    <div className="flex">

      {pretext && (
        <div className="pre-text-box text-right">
          <p className="font-light text-gray-500">{text1}</p>
          <p className="font-light text-gray-500">{text2}</p>
        </div>
      )}

      <div className="value-text-box text-right w-full pr-5">
        <p className="text-gray-400">{value1}</p>
        <p className="text-gray-400">{value2}</p>
      </div>

    </div>
  );
}

export default DoubleRowCell;