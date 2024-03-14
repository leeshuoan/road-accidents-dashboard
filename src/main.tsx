import './index.css'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './Map';
import TwitterTimeline from './TwitterTimeline';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='mx-auto w-11/12 mt-10'>
      <div className='flex space-between gap-5'>
        <Map />
        <TwitterTimeline />
      </div>
    </div>
  </React.StrictMode>,
);
