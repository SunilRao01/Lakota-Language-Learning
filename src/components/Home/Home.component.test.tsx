import React from 'react';
import {Home, mapDispatchToProps, mapStateToProps} from './Home.component'
import {addPost} from '../../redux/Posts/Posts.action'
import {rootReducer, RootState} from '../../store'
import {initialFilterState} from '../../redux/Filter/Filter.reducer'
import {render} from '@testing-library/react'
import {createStore} from 'redux'
import {initialRootState} from '../../store'
import {Provider} from 'react-redux'
import { createMemoryHistory } from 'history'
import {Router} from 'react-router'
import '@testing-library/jest-dom/extend-expect'

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
const renderWithReduxAndRouter = (
    ui: any,
    { initialState = {} , store = createStore(rootReducer, initialRootState)} = {},
    { route = '/', history = createMemoryHistory({ initialEntries: [route] })} = {}
) => {
    return {
        ...render(<Provider store={store}>
            <Router history={history}>
                {ui}
            </Router>
        </Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
}

describe('Home', () => {
    describe('side effects', () => {
        it('should get 5 most recent posts on start', () => {
            const { getAllByTestId } = renderWithReduxAndRouter(
                <Home />,
                {initialState: initialRootState});
            expect(getAllByTestId('postcard-large').length).toEqual(5);
        });


    })

    describe('redux', () => {
        it('should mapDispatchToProps', () => {
            const mockDispatch = jest.fn()

            const actual = mapDispatchToProps(mockDispatch)

            actual.addPost({
                id: 1,
                title: 'post title',
                creationDate: new Date(5, 1),
                categories: [],
                tags: [],
                content: 'new sample post'
            })

            expect(mockDispatch).toHaveBeenCalledWith(addPost({
                id: 1,
                title: 'post title',
                creationDate: new Date(5, 1),
                categories: [],
                tags: [],
                content: 'new sample post'
            }))
        });

        it('should mapStateToProps', () => {
            const initialState: RootState = {
                filterState: initialFilterState,
                postState: {
                    posts: [{
                        id: 1,
                        title: 'post title',
                        creationDate: new Date(5, 1),
                        categories: [],
                        tags: [],
                        content: 'new sample post'
                    }]
                }
            }

            const actual = mapStateToProps(initialState)

            expect(actual.posts).toEqual(initialState.postState.posts)
        });
    });
});
