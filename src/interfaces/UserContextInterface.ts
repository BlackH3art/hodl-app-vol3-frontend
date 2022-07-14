import { Dispatch, SetStateAction } from "react";
import { UserDocument, UserInterface } from "./UserInterface";

export interface UserContextInterface {
  user: UserInterface | null | UserDocument;
  setUser: Dispatch<SetStateAction<UserInterface | null>>;
  showCookieModal: boolean;
  setShowCookieModal: Dispatch<SetStateAction<boolean>>;
}