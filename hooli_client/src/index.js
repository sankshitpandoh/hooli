import React from 'react';
import ReactDOM from 'react-dom';
//Getting Global CSS
import './stylesheets/bootstrap.min.css';
import './stylesheets/font-face.css';
import './stylesheets/reset.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
