import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContextProvider from './context/UserContext';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserContextProvider>
  </React.StrictMode>
)
