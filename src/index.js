import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateContextProvider } from "./ContextStore/index"
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StateContextProvider>
        <App />
        <ToastContainer />
    </StateContextProvider>
);


