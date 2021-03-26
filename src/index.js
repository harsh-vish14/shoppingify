import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserContextProvider } from './costext/context';
import './index.css';

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root')
);
