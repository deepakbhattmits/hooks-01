import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context';
const rootElement = document.querySelector('#root');

ReactDOM.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>, rootElement);
