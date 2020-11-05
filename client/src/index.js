import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

/**
 * The client app is served via a Cloudflare worker
 * The handlers can be called at endpoints using "/api"
 */
export const apiEndpoint = 
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8787/api' // Local `wrangler dev` instance
    : '/api'; // Live Instance

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
