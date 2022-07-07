import { FC } from "react";
import { cryptoFormatter } from "../../helpers/cryptoFormatter";

interface Props {
  ticker: string;
  quantity: number;
}

const CryptoFormatter: FC<Props> = ({ ticker, quantity}) => {

  return(
    <div className="flex items-center justify-end">
      <p className="pr-2">{cryptoFormatter(quantity)}</p>
      <p className="text-sm text-gray-500">{ticker.toUpperCase()}</p>
    </div>
  )
}

export default CryptoFormatter;