import {
    apiAddLesson,
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

const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:4000';

describe('Asynchronous Actions', () => {
    test('[apiGetPosts] should dispatch setPosts action on apiGetPosts success', () => {
        let mockAxios = new MockAdapter(axios);
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

    test('[apiGetLessons] should dispatch setLessons action on success', () => {
        let mockAxios = new MockAdapter(axios);
        let mockLessonsFromBackend = ['geography', 'history'];
        mockAxios.onGet(`${apiUrl}/lessons`).reply(200, {
            lessons: mockLessonsFromBackend,
        });

        const expectedActions = [
            { type: 'SET_LESSONS', payload: mockLessonsFromBackend },
        ];
        const store = mockStore(initialRootState);

        return store.dispatch(apiGetLessons()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('[apiAddLesson] should dispatch addLesson action on success', () => {
        let mockAxios = new MockAdapter(axios);
        let mockNewLesson = {
            id: 4,
            lesson: 'newLessonTest',
        };
        mockAxios.onPost(`${apiUrl}/lessons`).reply(200, {
            lesson: {
                lesson: mockNewLesson,
            },
        });

        const expectedActions = [
            {
                type: 'ADD_LESSON',
                payload: {
                    lesson: {
                        id: 4,
                        lesson: 'newLessonTest',
                    },
                },
            },
        ];
        const store = mockStore(initialRootState);
        return store
            .dispatch(apiAddLesson('newLessonTest', 'jwt-token'))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
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
