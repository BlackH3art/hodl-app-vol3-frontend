import { FC } from "react";
import { dateFormatter } from "../../helpers/dateFormatter";
import { usdFormatter } from "../../helpers/usdFormatter";
import CoinNameCell from "../Reusable/CoinNameCell";
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
        />
      </TableCell>

      <TableCell>
        <p className="text-center">
          {type}
        </p>
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
          value1={`${quantity} ${ticker}`}
          value2={`${sellingQuantity} ${ticker}`}
          secondRow={type === "sell"}
        />
      </TableCell>

      <TableCell>
        <p className="text-center">
          {usdFormatter(invested)}
        </p>
      </TableCell>

      <TableCell>
        <p className="text-center">
          {usdFormatter(gain)}
        </p>
      </TableCell>

    </tr>
  );
}

export default RowHistory;