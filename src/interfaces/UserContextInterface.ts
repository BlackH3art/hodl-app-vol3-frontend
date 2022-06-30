import { Dispatch, SetStateAction } from "react";
import { UserInterface } from "./UserInterface";

export interface UserContextInterface {
  user: UserInterface | null;
  setUser: Dispatch<SetStateAction<UserInterface | null>>
}