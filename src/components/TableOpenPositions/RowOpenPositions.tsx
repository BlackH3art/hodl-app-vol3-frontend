import { Dispatch, FC, SetStateAction } from "react";
import { usdFormatter } from "../../helpers/usdFormatter";
import { CoinDataInterface } from "../../interfaces/CoinDataInterface";

import { RootState } from "../../redux/store";
import { useSelector } from 'react-redux';

import ActionCell from "../Reusable/ActionCell";
import CoinNameCell from "../Reusable/CoinNameCell";
import ColorValue from "../Reusable/ColorValue";
import CryptoFormatter from "../Reusable/CryptoFromatter";
import DoubleRowCell from "../Reusable/DoubleRowCell";
import PercentCell from "../Reusable/PercentCell";
import TableCell from "../Reusable/TableCell";
import LoadingRow from "../Reusable/LoadingRow";
import SellButtonCell from "../Reusable/SellButtonCell";

interface Props {
  id: string;
  nr: number;
  ticker: string;
  entryPrice: number;
  quantity: number;
  showCallback: Dispatch<SetStateAction<boolean>>;
}

const RowOpenPositions: FC<Props> = ({ nr, ticker, entryPrice, quantity, id, showCallback }) => {

  const coinsData: CoinDataInterface[] = useSelector<RootState, CoinDataInterface[]>((state) => state.coinsData.coinsData);
  
  const filteredDetailsArray: CoinDataInterface[] = coinsData.filter(item => item.ticker === ticker.toUpperCase());
  const coinDetails = filteredDetailsArray[0];

  return !coinDetails ? (
    <LoadingRow length={8} />
  ) : (
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
          element1={<p className="font-semibold text-gray-300">{usdFormatter(quantity * coinDetails.currentPrice)}</p>}
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
        <SellButtonCell 
          showCallback={showCallback} 
          id={id}
        />
      </TableCell>

      <TableCell>
        <ActionCell id={id} ticker={ticker} showCallback={showCallback} />
      </TableCell>
    </tr>
  )
}

export default RowOpenPositions;