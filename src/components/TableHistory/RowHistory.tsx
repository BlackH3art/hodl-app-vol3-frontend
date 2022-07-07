import { FC } from "react";
import { dateFormatter } from "../../helpers/dateFormatter";
import { mockData } from "../../helpers/mockData";
import { usdFormatter } from "../../helpers/usdFormatter";
import { CoinData } from "../../interfaces/CoinData";
import CoinNameCell from "../Reusable/CoinNameCell";
import ColorValue from "../Reusable/ColorValue";
import CryptoFormatter from "../Reusable/CryptoFromatter";
import DoubleROwHistoryCell from "../Reusable/DoubleRowHistoryCell";

import TableCell from "../Reusable/TableCell";


interface Props {
  nr: number;
  ticker: string;
  type: "buy" | "sell";
  sellingPrice: number;
  entryPrice: number;
  quantity: number;
  sellingQuantity: number; 
  invested: number;
  gain: number;
  closeDate: Date;
  openDate: Date;
}

const RowHistory: FC<Props> = ({ nr, ticker, type, sellingPrice, entryPrice, quantity, sellingQuantity, invested, gain, closeDate, openDate }) => {

  const filteredDetailsArray: CoinData[] = mockData.filter(item => item.symbol === ticker.toUpperCase());
  const coinDetails = filteredDetailsArray[0];

  return(
    <tr className="row text-gray-400 border-b-[1px] border-gray-800">

      <TableCell>
        <p className="text-center">
          {nr}
        </p>
      </TableCell>

      <TableCell>
        <CoinNameCell 
          name={ticker}
          image={coinDetails.logo}
        />
      </TableCell>

      <TableCell>
        <div className={`${type === "buy" ? "bg-[#86efadcb]" : "bg-[#fca5a5b7]"} rounded-xl w-12 m-auto`}>
          <p className={`${type === "buy" ? "text-green-900" : "text-red-800"} py-1 text-center text-sm font-semibold`}>
            {type.toUpperCase()}
          </p>
        </div>
      </TableCell>

      <TableCell>
        <DoubleROwHistoryCell 
          text1="open:"
          text2="close:"
          value1={dateFormatter(openDate)}
          value2={dateFormatter(closeDate)}
          secondRow={type === "sell"}
        />
      </TableCell>

      <TableCell>
        <DoubleROwHistoryCell 
          text1="entry:"
          text2="close:"
          value1={usdFormatter(entryPrice)}
          value2={usdFormatter(sellingPrice)}
          secondRow={type === "sell"}
        />
      </TableCell>

      <TableCell>
        <DoubleROwHistoryCell 
          text1="buy:"
          text2="sell:"
          value1={<CryptoFormatter quantity={quantity} ticker={ticker} />}
          value2={<CryptoFormatter quantity={sellingQuantity} ticker={ticker} />}
          secondRow={type === "sell"}
        />
      </TableCell>

      <TableCell>
        <p className="text-center">
          {usdFormatter(invested)}
        </p>
      </TableCell>

      <TableCell>
        <div className="text-right">
          <ColorValue setValue value={gain} />
        </div>
      </TableCell>

    </tr>
  );
}

export default RowHistory;