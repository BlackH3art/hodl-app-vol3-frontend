import { Dispatch, SetStateAction } from "react";
import { UserInterface } from "./UserInterface";

export interface UserContextInterface {
  user: UserInterface | {};
  setUser: Dispatch<SetStateAction<UserInterface>>
}