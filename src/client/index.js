import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary'
import store from './store';


ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>,
    document.getElementById('app')
);