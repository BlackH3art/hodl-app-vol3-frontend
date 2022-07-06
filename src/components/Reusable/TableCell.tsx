import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const TableCell: FC<Props> = ({ children }) => (
  <td className="px-5 py-2"> {children} </td>
);

export default TableCell;