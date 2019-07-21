import React from 'react';
import {initialPostState, Post, postReducer} from './Posts.reducer'
import {addPost, deletePost, getPosts, getTags} from './Posts.action'

describe('postReducer', () => {
    it('should get posts for GET_POST action', () => {
        const actualState = postReducer({
            posts: [{
                id: 3,
                postTitle: 'test post title',
                postContent: 'test post',
                creationDate: new Date(2020, 6, 23),
                categories: ['test category', 'test category 2'],
                tags: ['test tag', 'test tag 2']
            }],
            tags: new Set([]),
            categories: new Set([])
        }, getPosts())

        // Verify posts
        expect(actualState.posts.length).toEqual(1)
        expect(actualState.posts[0]).toEqual({
            id: 3,
            postTitle: 'test post title',
            postContent: 'test post',
            creationDate: new Date(2020, 6, 23),
            categories: ['test category', 'test category 2'],
            tags: ['test tag', 'test tag 2']
        })

        // Verify tags
        expect(Array.from(actualState.tags)).toEqual([
            'test tag',
            'test tag 2'
        ])

        // Verify categories
        expect(Array.from(actualState.categories)).toEqual([
            'test category',
            'test category 2'
        ])
    });

    it('should add post for ADD_POST action', () => {
        const newPost: Post = {
            id: 3,
            postTitle: 'test post title',
            postContent: 'test post',
            creationDate: new Date(2020, 6, 23),
            categories: ['test category', 'test category 2'],
            tags: ['test tag', 'test tag 2']
        }

        const actualState = postReducer(initialPostState, addPost(newPost))
        const expectedPosts: Post[] = [...initialPostState.posts, newPost]

        expect(actualState.posts).toEqual(expectedPosts)
    });

    it('should delete post for DELETE_POST action', () => {
        const actualState = postReducer(initialPostState, deletePost(0))

        expect(actualState.posts.length).toEqual(2)
    });
});
