import { FC, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

interface Props {
  current?: number;
  entry?: number;
  setValue: boolean;
  value?: number;
}

const PercentCell: FC<Props> = ({ current, entry, setValue, value }) => {

  const [percentValue, setPercentValue] = useState<number>(0);

  useEffect(() => {

    calculatePercent();

  }, []);

  const calculatePercent = () => {

    let result: number;

    if(setValue && value) {
      return setPercentValue(value);
    } else if (!value && current && entry) {

      result = (((current - entry) / entry) * 100);
      return setPercentValue(result);
    } else {
      return;
    }
  }

  return(
    <div className="flex">
      {percentValue > 0 && (<><p className="flex items-center text-green-300"><FaCaretUp color=""/> {`${percentValue.toFixed(2)}%`}</p></>)}
      {percentValue === 0 && (<><p className="text-gray-400">{`${percentValue.toFixed(2)}%`}</p></>)}
      {percentValue < 0 && (<><p className="flex items-center text-red-300"><FaCaretDown color=""/> {`${Math.abs(percentValue).toFixed(2)}%`}</p></>)}
    </div>
  )
}

export default PercentCell