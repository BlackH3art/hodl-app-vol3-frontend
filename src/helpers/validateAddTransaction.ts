import { FormValidationError, TransactionData } from "../components/HodlApp/AddTransactionForm";

export const validateAddTransaction = (transactionData: TransactionData): FormValidationError => {

  const error: FormValidationError = {
    ticker: "",
    amount: "",
    price: ""
  } 

  
  if(transactionData.ticker === "") error.ticker = "Ticker cannot be empty";
  if(transactionData.quantity === "") error.amount = "Amount cannot be empty";
  if(transactionData.price === "") error.price = "Price cannot be empty";

  if(Number(transactionData.quantity) <= 0) error.amount = "Amount must be greater than 0";
  if(Number(transactionData.price) < 0) error.price = "Price cannot be negative";
  if(Number(transactionData.price) === 0) error.price = "Price cannot be zero";


  return error;
}