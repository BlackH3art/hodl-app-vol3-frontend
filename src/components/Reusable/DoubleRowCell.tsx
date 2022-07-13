import { FC, ReactNode } from "react";

interface Props {
  text1?: string;
  text2?: string;
  value1?: number | string | ReactNode;
  value2?: number | string | ReactNode;
  pretext: boolean;
  element1?: ReactNode;
  element2?: ReactNode;
}

const DoubleRowCell: FC<Props> = ({ text1, text2, value1, value2, pretext, element1, element2 }) => {

  return(
    <div className="flex">

      {pretext && (
        <div className="pre-text-box text-right">
          <p className="font-light text-gray-500">{text1}</p>
          <p className="font-light text-gray-500">{text2}</p>
        </div>
      )}

      <div className="value-text-box text-right w-full text-gray-400 pr-5">
        {element1 ? element1 : (<p className="text-gray-400">{value1}</p>) }
        {element2 ? element2 : (<p className="text-gray-400">{value2}</p>) }
      </div>

    </div>
  );
}

export default DoubleRowCell;