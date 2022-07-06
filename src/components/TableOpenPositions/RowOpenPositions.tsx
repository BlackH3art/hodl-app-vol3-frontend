import { FC } from "react";
import ActionCell from "../Reusable/ActionCell";
import CoinNameCell from "../Reusable/CoinNameCell";
import DoubleRowCell from "../Reusable/DoubleRowCell";
import SellFormCell from "../Reusable/SellFormCell";
import TableCell from "../Reusable/TableCell";

interface Props {
  nr: number;
  ticker: string;
  entryPrice: number;
  quantity: number;
}

const RowOpenPositions: FC<Props> = ({ nr, ticker, entryPrice, quantity }) => {

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
        <DoubleRowCell
          text1="current:"
          text2="entry:"
          value1={"22.21"}
          value2={entryPrice}
          pretext
        />
      </TableCell>

      <TableCell>
        <DoubleRowCell 
          value1={"q * price"}
          value2={`${quantity} ${ticker}`}
          pretext={false}
        />
      </TableCell>

      <TableCell>
        <DoubleRowCell 
          text1="change:"
          text2="invested:"
          value1={"(q * p) - (q * ep)"}
          value2={quantity * entryPrice}
          pretext
        />
      </TableCell>

      <TableCell> 
        <p className="text-center">
          154%
        </p>
      </TableCell>

      <TableCell>
        <SellFormCell />
      </TableCell>

      <TableCell>
        <ActionCell />
      </TableCell>
    </tr>
  )
}

export default RowOpenPositions;