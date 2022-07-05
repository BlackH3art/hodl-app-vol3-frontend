import axios from 'axios';
import { TransactionData } from '../components/HodlApp/AddTransactionForm';
import { LoginData } from '../components/LoginForm/LoginForm';
import { SignUpFormData } from '../components/SignUpForm/SignUpForm';
import { MyResponse } from '../interfaces/MyResponse';
import { UserInterface } from '../interfaces/UserInterface';

const API = axios.create({ 
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});


export const login = (loginData: LoginData) => API.post<UserInterface>('/auth/login', loginData);
export const signUp = (signUpData: SignUpFormData) => API.post<MyResponse>('/user/register', signUpData);


export const addTransaction = (transactionData: TransactionData) => API.post<MyResponse>('/transaction/add', transactionData );