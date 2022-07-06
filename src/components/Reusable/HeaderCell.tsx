import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HeaderCell: FC<Props> = ({ children }) => (
  <th className="px-5 py-5"> {children} </th>
)


export default HeaderCell;