import React from 'react';
import {Home, mapStateToProps} from './Home.component'
import {initialRootState, rootReducer, RootState} from '../../store'
import {initialFilterState} from '../../redux/Filter/Filter.reducer'
import {render, within} from '@testing-library/react'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router'
import '@testing-library/jest-dom/extend-expect'
import thunk from 'redux-thunk'
import {initialPostState} from '../../redux/Posts/Posts.reducer'

const renderWithReduxAndRouter = (
    ui: any,
    {store = createStore(rootReducer, initialRootState, applyMiddleware(thunk))} = {},
    {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {}
) => {
    return {
        ...render(<Provider store={store}>
            <Router history={history}>
                {ui}
            </Router>
        </Provider>),
        store
    }
}

describe('Home', () => {
    describe('side effects', () => {
        const initialStore: RootState = {
            ...initialRootState,
            postState: {
                ...initialPostState,
                posts: [{
                    id: 1,
                    title: 'title',
                    content: 'content',
                    creationDate: 'nao',
                    categories: ['word of the day'],
                    tags: ['word of the day']
                }, {
                    id: 2,
                    title: 'title2',
                    content: 'content2',
                    creationDate: 'nao2',
                    categories: [],
                    tags: []
                }, {
                    id: 3,
                    title: 'title3',
                    content: 'content3',
                    creationDate: 'nao3',
                    categories: [],
                    tags: ['word of the day']
                }],
                wordOfTheDayPosts: [
                    {
                        id: 7,
                        title: 'title3',
                        content: 'content3',
                        creationDate: 'nao3',
                        categories: [],
                        tags: ['word of the day']
                    }
                ]
            }
        }

        it('should render posts on start', () => {
            const {getAllByTestId} = renderWithReduxAndRouter(<Home/>, {
                store: createStore(rootReducer, initialStore, applyMiddleware(thunk))
            });

            expect(getAllByTestId('postcard-large').length).toEqual(3);
        });

        it('should parse and show posts under "Word of the Day" section', () => {
            const {getByTestId} = renderWithReduxAndRouter(<Home/>, {
                store: createStore(rootReducer, initialStore, applyMiddleware(thunk))
            });

            const numOfWordOfTheDayPosts = within(getByTestId('word-of-the-day')).getAllByTestId('postcard-small').length
            expect(numOfWordOfTheDayPosts).toEqual(1)
        });
    })

    describe('redux', () => {
        it('should mapStateToProps', () => {
            const initialState: RootState = {
                ...initialRootState,
                filterState: initialFilterState,
                postState: {
                    ...initialRootState.postState,
                    posts: [{
                        id: 1,
                        title: 'post title',
                        creationDate: 'date',
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
