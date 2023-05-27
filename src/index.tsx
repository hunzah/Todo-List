import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './App';
import AppWithReducers from './AppWithReducers';
import AppWithRedux from './AppWithRedux';
import {store} from './store';
import {Provider} from 'react-redux';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        {/*<App/>*/}
        {/*<AppWithReducers/>*/}
        <AppWithRedux/>
    </Provider>
);

