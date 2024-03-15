import './main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Dashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='mx-auto w-11/12 mt-10'>
      <Dashboard />
    </div>
  </React.StrictMode>,
);
