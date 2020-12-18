import {
    apiGetLessons,
    apiGetPosts,
    initialPostState,
    Post,
    postReducer,
} from './Posts.reducer';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { addPost, PostActionTypes } from './Posts.action';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { initialRootState, RootState } from '../store';

const middlewares = [thunk];

const mockStore = configureMockStore<
    RootState,
    ThunkDispatch<RootState, null, PostActionTypes>
>(middlewares);
let mockAxios = new MockAdapter(axios);

const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:4000';

describe('Asynchronous Actions', () => {
    afterEach(() => {
        mockAxios.restore();
    });

    it('[apiGetPosts] should dispatch setPosts action on apiGetPosts success', () => {
        let mockPostsFromBackend = [
            {
                categories: ['cat1'],
                content: 'post content',
                creationDate: '2020-09-21T20:48:23',
                id: 9,
                podcastLink: '',
                quizzes: [],
                tags: ['tag91'],
                title: 'Post Number 123',
            },
        ];
        mockAxios.onGet(`${apiUrl}/posts?page=1`).reply(200, {
            posts: mockPostsFromBackend,
        });

        const expectedActions = [
            { type: 'SET_POSTS', payload: mockPostsFromBackend }, // Set posts after retrieval
        ];
        const store = mockStore(initialRootState);

        return store.dispatch(apiGetPosts(1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('[apiGetLessons] should dispatch setLessons action on success', function () {
        let mockLessonsFromBackend = ['geography', 'history'];
        mockAxios.onGet(`${apiUrl}/lessons`).reply(200, {
            lessons: mockLessonsFromBackend,
        })

        const expectedActions = [
            { type: 'SET_LESSONS', payload: mockLessonsFromBackend },
        ];
        const store = mockStore(initialRootState);

        return store.dispatch(apiGetLessons()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
});

describe('Synchronous Actions', () => {
    it('[addPost] should add post for ADD_POST action', () => {
        const newPost: Post = {
            id: 3,
            title: 'test post title',
            content: 'test post',
            creationDate: '',
            categories: ['test category', 'test category 2'],
            tags: ['test tag', 'test tag 2'],
        };

        const actualState = postReducer(initialPostState, addPost(newPost));
        const expectedPosts: Post[] = [...initialPostState.posts, newPost];

        expect(actualState.posts).toEqual(expectedPosts);
    });
});
