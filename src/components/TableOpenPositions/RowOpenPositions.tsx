import { Dispatch, FC, SetStateAction } from "react";
import { mockData } from "../../helpers/mockData";
import { usdFormatter } from "../../helpers/usdFormatter";
import { CoinDataInterface } from "../../interfaces/CoinDataInterface";

import ActionCell from "../Reusable/ActionCell";
import CoinNameCell from "../Reusable/CoinNameCell";
import ColorValue from "../Reusable/ColorValue";
import CryptoFormatter from "../Reusable/CryptoFromatter";
import DoubleRowCell from "../Reusable/DoubleRowCell";
import PercentCell from "../Reusable/PercentCell";
import SellFormCell from "../Reusable/SellFormCell";
import TableCell from "../Reusable/TableCell";

interface Props {
  id: string;
  nr: number;
  ticker: string;
  entryPrice: number;
  quantity: number;
  showCallback: Dispatch<SetStateAction<boolean>>;
}

const RowOpenPositions: FC<Props> = ({ nr, ticker, entryPrice, quantity, id, showCallback }) => {

  const filteredDetailsArray: CoinDataInterface[] = mockData.filter(item => item.symbol === ticker.toUpperCase());
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
          ticker={ticker}
          image={coinDetails.logo}
        />
      </TableCell>

      <TableCell>
        <DoubleRowCell
          text1="current:"
          text2="entry:"
          value1={usdFormatter(coinDetails.currentPrice)}
          value2={usdFormatter(entryPrice)}
          pretext
        />
      </TableCell>

      <TableCell>
        <DoubleRowCell 
          value1={usdFormatter(quantity * coinDetails.currentPrice)}
          value2={<CryptoFormatter quantity={quantity} ticker={ticker} />}
          pretext={false}
        />
      </TableCell>

      <TableCell>
        <DoubleRowCell 
          text1="change:"
          text2="invested:"
          value1={<ColorValue current={quantity * coinDetails.currentPrice} invested={quantity * entryPrice} setValue={false} />}
          value2={usdFormatter(quantity * entryPrice)}
          pretext
        />
      </TableCell>

      <TableCell> 
        <PercentCell 
          current={coinDetails.currentPrice}
          entry={entryPrice}
          setValue={false}
        />
      </TableCell>

      <TableCell>
        <SellFormCell />
      </TableCell>

      <TableCell>
        <ActionCell id={id} ticker={ticker} showCallback={showCallback} />
      </TableCell>
    </tr>
  )
}

export default RowOpenPositions;