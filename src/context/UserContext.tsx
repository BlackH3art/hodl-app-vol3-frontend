import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { UserContextInterface } from "../interfaces/UserContextInterface";
import { UserInterface } from "../interfaces/UserInterface";


export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {},
  showCookieModal: false,
  setShowCookieModal: () => {},
})

interface Props {
  children: ReactNode;
}

const UserContextProvider: FC<Props> = ({ children }) => {

  const [user, setUser] = useState<UserInterface | null>(null);
  const [showCookieModal, setShowCookieModal] = useState<boolean>(false);

  useEffect(() => {

    const acceptedCookie = localStorage.getItem('accepted cookie');

    if(acceptedCookie) {
      setShowCookieModal(false);
    } else {
      setShowCookieModal(true);
    }

  }, []);

  return(
    <UserContext.Provider value={{
      user,
      setUser,
      showCookieModal,
      setShowCookieModal,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;