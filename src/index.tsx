import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './App';
import AppWithReducers from './AppWithReducers';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        {/*<App/>*/}
        <AppWithReducers/>
    </React.StrictMode>
);

