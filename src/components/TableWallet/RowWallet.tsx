import { FC } from "react";
import { mockData } from "../../helpers/mockData";
import { usdFormatter } from "../../helpers/usdFormatter";
import { CoinData } from "../../interfaces/CoinDataInterface";
import CoinNameCell from "../Reusable/CoinNameCell";
import ColorValue from "../Reusable/ColorValue";
import CryptoFormatter from "../Reusable/CryptoFromatter";
import DoubleRowCell from "../Reusable/DoubleRowCell";
import PercentCell from "../Reusable/PercentCell";
import TableCell from "../Reusable/TableCell";

interface Props {
  ticker: string;
  averagePrice: number;
  quantitySum: number;
  nr: number;
}


const RowWallet: FC<Props> = ({ nr, ticker, averagePrice, quantitySum }) => {

  const filteredDetailsArray: CoinData[] = mockData.filter(item => item.symbol === ticker.toUpperCase());
  const coinDetails = filteredDetailsArray[0];

  ["#", "Coin", "Ticker", "Price", "1h", "24h", "7 days", "Shares", "Profit/Loss"]

  return (
    <tr className="row text-gray-400 border-b-[1px] border-gray-800">

      <TableCell>
        <p className="text-center">
          {nr}
        </p>
      </TableCell>

      <TableCell>
        <CoinNameCell 
          name={coinDetails.name}
          image={coinDetails.logo}
        />
      </TableCell>

      <TableCell>
        <p className="text-sm text-gray-500 text-center">{ticker.toUpperCase()}</p>
      </TableCell>

      <TableCell>
        <DoubleRowCell
          text1="current:"
          text2="average:"
          value1={usdFormatter(coinDetails.currentPrice)}
          value2={usdFormatter(averagePrice)}
          pretext
        />
      </TableCell>

      <TableCell> 
        <PercentCell 
          setValue
          value={coinDetails.change1h}
        />
      </TableCell>

      <TableCell> 
        <PercentCell 
          setValue
          value={coinDetails.change24h}
        />
      </TableCell>

      <TableCell> 
        <PercentCell 
          setValue
          value={coinDetails.change7d}
        />
      </TableCell>

      <TableCell>
        <DoubleRowCell 
          value1={usdFormatter(quantitySum * coinDetails.currentPrice)}
          value2={<CryptoFormatter quantity={quantitySum} ticker={ticker} />}
          pretext={false}
        />
      </TableCell>


      <TableCell>
        <DoubleRowCell 
          value1={<ColorValue current={quantitySum * coinDetails.currentPrice} invested={quantitySum * averagePrice} setValue={false} />}
          value2={<PercentCell current={quantitySum * coinDetails.currentPrice} entry={quantitySum * averagePrice} setValue={false} />}
          pretext={false}
        />
      </TableCell>


    </tr>
  );
}

export default RowWallet;