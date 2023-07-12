import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';



import '../node_modules/react-bootstrap/dist/react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './Store/auth-ctx';
import store from './Store/redux-store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
      <ContextProvider>
          <App />
      </ContextProvider>
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
