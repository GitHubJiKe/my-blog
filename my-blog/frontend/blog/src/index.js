import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, DevTools } from './store/index';
// import registerServiceWorker from './registerServiceWorker';
var rootDiv = document.getElementById('root');
if (!rootDiv) {
    document.write('<div id="root"></div>');
    rootDiv = document.getElementById('root');
}


render(
    <Provider store={store}>
        <div>
            <App />
        </div>
    </Provider>,
    rootDiv);
// registerServiceWorker();
