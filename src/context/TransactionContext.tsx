import { createContext, FC, ReactNode, useState } from "react";
import { TransactionContextInterface } from "../interfaces/TransactionContextInterface";


export const TransactionContext = createContext<TransactionContextInterface>({
  idToEdit: null,
  setIdToEdit: () => {},
});

interface Props {
  children: ReactNode;
}

const TransactionContextProvider: FC<Props> = ({ children }) => {

  const [idToEdit, setIdToEdit] = useState<string | null>(null);


  return(
    <TransactionContext.Provider value={{
      idToEdit,
      setIdToEdit,
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionContextProvider;