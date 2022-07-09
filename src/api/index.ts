import axios from 'axios';
import { TransactionData } from '../components/HodlApp/AddTransactionForm';
import { LoginData } from '../components/LoginForm/LoginForm';
import { SignUpFormData } from '../components/SignUpForm/SignUpForm';
import { CoinDataInterface } from '../interfaces/CoinDataInterface';
import { HistoryItemInterface } from '../interfaces/HistoryItemInterface';
import { MyResponse } from '../interfaces/MyResponse';
import { AverageTransaction, TransactionInterface } from '../interfaces/TransactionInterface';
import { UserInterface } from '../interfaces/UserInterface';

const API = axios.create({ 
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});


export const login = (loginData: LoginData) => API.post<UserInterface>('/auth/login', loginData);
export const signUp = (signUpData: SignUpFormData) => API.post<MyResponse>('/user/register', signUpData);


export const getTransactions = () => API.get<TransactionInterface[]>('/transaction/all');
export const getAverage = () => API.get<AverageTransaction[]>('/transaction/average');
export const getHistory = () => API.get<HistoryItemInterface[]>('/transaction/history');


export const addTransaction = (transactionData: TransactionData) => API.post<MyResponse>('/transaction/add', transactionData );
export const deleteTransaction = (transactionID: string) => API.delete<MyResponse>(`/transaction/delete/${transactionID}`);
export const editTransaction = (transactionID: string, editedTransaction: TransactionData) => API.patch<MyResponse>(`/transaction/edit/${transactionID}`, editedTransaction);


export const getCoinsData = () => API.get<CoinDataInterface[]>('/fetch/coins');