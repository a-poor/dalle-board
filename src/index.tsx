import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createServer } from "miragejs";

import './index.css';
import App from './App';
import {
  dummyData,
  modelURL,
  IModelResponse,
} from './api';

// Configure the dummy server
createServer({
  routes() {
    this.post(modelURL, () => dummyData as IModelResponse);
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
