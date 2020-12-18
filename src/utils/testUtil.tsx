import React from 'react';
import { render as rtlRender, RenderResult } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialRootState, rootReducer } from '../redux/store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function render(
    ui: any,
    startingReduxStore?: any,
    urlPath?: any
): RenderResult {
    let store = createStore(
        rootReducer,
        startingReduxStore || initialRootState,
        applyMiddleware(thunk)
    );
    let history = createMemoryHistory({ initialEntries: [urlPath || '/'] });

    function Wrapper({ children }: any) {
        return (
            <Provider store={store}>
                <Router history={history}>{children}</Router>
            </Provider>
        );
    }

    return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
