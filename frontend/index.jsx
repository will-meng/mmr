import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'; 

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();

  // Testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // End Testing

  ReactDOM.render(<h1>Welcome to MyMapRun</h1>, root);
});