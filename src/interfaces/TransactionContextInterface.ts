import { Dispatch, SetStateAction } from "react";

export interface TransactionContextInterface {
  idToEdit: string | null;
  setIdToEdit: Dispatch<SetStateAction<string | null>>;
}