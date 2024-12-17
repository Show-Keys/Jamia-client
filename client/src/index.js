import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Store'; // Make sure the path to your store is correct
import App from './App';
import './index.css'; // Your global CSS file

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with the Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

