import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home.component';
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '../../utils/testUtil';
import { initialRootState } from '../../redux/store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:4000';

const dummyPost = {
    categories: ['cat1'],
    content: 'post content',
    creationDate: '2020-09-21T20:48:23',
    id: 1,
    podcastLink: '',
    quizzes: [],
    tags: ['tag91'],
    title: 'Post Number 123',
}

test('only display a maximum of 5 posts per page', async () => {
    let mockAxios = new MockAdapter(axios);

    let mockPostsFromBackend = [];
    for (let i = 0; i < 8; i++) {
        mockPostsFromBackend.push(dummyPost);
    }

    // NOTE: Mock getting 8 posts back from backend
    mockAxios.onGet(`${apiUrl}/posts?page=1`).reply(200, {
        posts: mockPostsFromBackend,
    });
    // NOTE: The rest of the requests will be ignored
    mockAxios.onAny().reply(200, {
        data: []
    })

    render(<Home />, initialRootState);

    await waitForElementToBeRemoved(() => {
        return screen.queryByTestId('progress-bar');
    });

    // NOTE: Should only display a maximum of 5 posts, even though we have 8 in the redux store
    expect(screen.getAllByTestId('postcard-large').length).toEqual(5);
});

test('disable "Next Page" button on last page', async () => {
    let mockAxios = new MockAdapter(axios);
    let mockPostsFromBackend = [];
    // NOTE: when the current page consists of less than 5 posts, the app
    //  interprets that as the last page
    for (let i = 0; i < 3; i++) {
        mockPostsFromBackend.push(dummyPost)
    }

    mockAxios.onGet(`${apiUrl}/posts?page=1`).reply(200, {
        posts: mockPostsFromBackend,
    });
    mockAxios.onAny().reply(200, {});

    render(<Home />)

    await waitForElementToBeRemoved(() => {
        return screen.queryByTestId('progress-bar');
    });

    expect(screen.getByTestId('next-page')).toHaveAttribute('disabled')
});

test('disable "Previous Page" button on first page', async () => {
    let mockAxios = new MockAdapter(axios);
    mockAxios.onAny().reply(200, {
        data: [],
    });

    render(<Home />)

    await waitForElementToBeRemoved(() => {
        return screen.queryByTestId('progress-bar');
    });

    expect(screen.getByTestId('previous-page')).toHaveAttribute('disabled')
});
