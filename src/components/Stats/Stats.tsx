import { FC } from "react";
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

import { usdFormatter } from "../../helpers/usdFormatter";

import { ChartData, Statistics } from "../HodlApp/HodlApp";
import PieChart from "./PieChart";


interface Props {
  stats: Statistics;
  chartData: ChartData[];
  loadingStats: boolean;
}

const Stats: FC<Props> = ({ stats, chartData, loadingStats }) => {

  

  return (
    <section className="w-full xl:w-3/4 flex flex-col items-center pt-10">

      <div className="flex flex-col-reverse md:flex-row w-full justify-between">

        <PieChart chartData={chartData} loadingStats={loadingStats}  />

        <div className="text-myBlue px-5">

          <div className="flex justify-end">
            <div className="flex items-end px-5 text-lg font-semibold">
              {stats.percentPNL > 0 && (<><p className="flex items-center text-green-300 py-4"><FaCaretUp /> {`${stats.percentPNL.toFixed(2)}%`}</p></>)}
              {stats.percentPNL === 0 && (<><p className="text-gray-400 py-4">{`${stats.percentPNL.toFixed(2)}%`}</p></>)}
              {stats.percentPNL < 0 && (<><p className="flex items-center text-red-300 py-4"><FaCaretDown /> {`${Math.abs(stats.percentPNL).toFixed(2)}%`}</p></>)}
            </div>
            <h2 className="text-4xl font-bold py-4">
              {usdFormatter(stats.totalCapital)}
            </h2>
          </div>

          <div className="flex justify-end">

            <div className="flex flex-col w-1/3 items-end pr-5">
              <p className="text-gray-400 py-1">change:</p>
              <p className="text-gray-400 py-1">invested:</p>
            </div>

            <div className="flex flex-col items-end">
              {stats.dolarPNL > 0 && (<><p className="flex items-center text-green-300 py-1">{`${usdFormatter(stats.dolarPNL)}`}</p></>)}
              {stats.dolarPNL === 0 && (<><p className="text-gray-400 py-1">{`${usdFormatter(stats.dolarPNL)}`}</p></>)}
              {stats.dolarPNL < 0 && (<><p className="flex items-center text-red-300 py-1">{`${usdFormatter(stats.dolarPNL)}`}</p></>)}
              <p className="text-gray-300 py-1 font-semibold">{usdFormatter(stats.totalCapitalInvested)}</p>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
 
export default Stats;