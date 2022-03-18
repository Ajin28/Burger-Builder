import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// In (strict mode) additional render is intentional.
// It only happens in development mode. Also only Functional components,  not class components.
// It's intended to help prevent errors in certain situations.
// Strict mode keeps coders from using techniques
// not advised by React guidelines.
// It seems,  React is "cleaning up some loose ends".
// React is changing (via React Hooks),
// so there will be growing pains.

// Therefore the withErrorHandler component code ran twice and 2 
// additional interceptors are added. Thats why clean up code wasn't working right.
// In order to use functional withErrorHandler properly remove <React.StrictMode>