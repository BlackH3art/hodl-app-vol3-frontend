import { createContext, FC, ReactNode, useState } from "react";
import { UserContextInterface } from "../interfaces/UserContextInterface";
import { UserInterface } from "../interfaces/UserInterface";


export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {},
})

interface Props {
  children: ReactNode;
}

const UserContextProvider: FC<Props> = ({ children }) => {

  const [user, setUser] = useState<UserInterface | null>(null);

  return(
    <UserContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;