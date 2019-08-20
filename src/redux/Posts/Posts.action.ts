import {Post} from './Posts.reducer';

export interface GetPosts {
    type: 'GET_POSTS',
    payload: number
}

export interface SetPosts {
    type: 'SET_POSTS',
    payload: Post[]
}

export interface AddPost {
    type: 'ADD_POST',
    payload: Post
}


export interface DeletePost {
    type: 'DELETE_POST',
    payload: number
}

export interface SetCurrentPost {
    type: 'SET_CURRENT_POST',
    payload: Post
}

export interface SetUpdatingPostLoading {
    type: 'SET_UPDATING_POST_LOADING',
    payload: boolean
}

export type PostActionTypes = GetPosts | SetPosts | AddPost
    | DeletePost | SetCurrentPost | SetUpdatingPostLoading

export const getPosts = (pageNumber: number): PostActionTypes => {
    return {
        type: 'GET_POSTS',
        payload: pageNumber
    }
}

export const addPost = (newPost: Post): PostActionTypes => {
    return {
        type: 'ADD_POST',
        payload: newPost
    }
};

export const deletePost = (postId: number): PostActionTypes => {
    return {
        type: 'DELETE_POST',
        payload: postId
    }
};

export const setPosts = (posts: Post[]): PostActionTypes => {
    return {
        type: 'SET_POSTS',
        payload: posts
    }
}

export const setCurrentPost = (post: Post): PostActionTypes => {
    return {
        type: 'SET_CURRENT_POST',
        payload: post
    }
}

export const setUpdatingPostLoading = (status: boolean): PostActionTypes => {
    return {
        type: 'SET_UPDATING_POST_LOADING',
        payload: status
    }
}
