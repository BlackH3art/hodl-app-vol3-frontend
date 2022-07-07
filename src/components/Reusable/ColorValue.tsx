import { FC, useEffect, useState } from "react";
import { usdFormatter } from "../../helpers/usdFormatter";

interface Props {
  current?: number;
  invested?: number;
  setValue: boolean;
  value?: number;
}


const ColorValue: FC<Props> = ({current, invested, setValue, value}) => {

  const [coloredValue, setColoredValue] = useState<number>(0);

  useEffect(() => {

    prepareValue();

  }, []);

  const prepareValue = () => {

    let result: number;

    if(setValue && value) {
      setColoredValue(value);
    } else if(!value && current && invested) {

      result = current - invested;
      setColoredValue(result);
    } else {
      return;
    }
  }

  const usdFormattedValue = usdFormatter(coloredValue);

  return(
    <div className="">
      {coloredValue > 0 && (<p className="text-green-300">{usdFormattedValue}</p>)}
      {coloredValue === 0 && (<p className="text-gray-400">{usdFormattedValue}</p>)}
      {coloredValue < 0 && (<p className="text-red-300">{usdFormattedValue}</p>)}
    </div>
  )
}

export default ColorValue;