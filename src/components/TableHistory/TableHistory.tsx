import { FC } from "react";
import HeaderCell from "../Reusable/HeaderCell";


const TableHistory: FC = () => {

  const tableHeaders: string[] = [
    "#", "Ticker", "Type", "Date", "Price", "Amount", "Invested", "Gain"
  ];

  return(
    <>
      <thead>
        <tr className="text-gray-500">
          {tableHeaders.map((header: string, index: number) => (
            <HeaderCell key={index}>
              <p>
                {header}
              </p>
            </HeaderCell>
          ))}
        </tr>
      </thead>

    </>
  );
}

export default TableHistory;