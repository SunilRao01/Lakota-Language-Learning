import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import { store } from 'redux/store';

import './index.css';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
