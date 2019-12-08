import {Post, PostPayload} from './Posts.reducer';

export interface GetPosts {
    type: 'GET_POSTS'
}

export interface SetPosts {
    type: 'SET_POSTS',
    payload: Post[]
}

export interface SetLessons {
    type: 'SET_LESSONS',
    payload: string[]
}

export interface SetCategories {
    type: 'SET_CATEGORIES',
    payload: string[]
}

export interface SetTags {
    type: 'SET_TAGS',
    payload: string[]
}

export interface AddPost {
    type: 'ADD_POST',
    payload: Post
}

export interface DeletePost {
    type: 'DELETE_POST',
    payload: number
}

export interface ClearPosts {
    type: 'CLEAR_POSTS'
}

export interface SetCurrentPost {
    type: 'SET_CURRENT_POST',
    payload: PostPayload
}

export interface SetUpdatingPostLoading {
    type: 'SET_UPDATING_POST_LOADING',
    payload: boolean
}

export type PostActionTypes = GetPosts | SetPosts | SetLessons | SetCategories | SetTags
    | AddPost | DeletePost | ClearPosts | SetCurrentPost | SetUpdatingPostLoading

export const getPosts = (): PostActionTypes => {
    return {
        type: 'GET_POSTS'
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

export const clearPosts = (): PostActionTypes => {
    return {
        type: 'CLEAR_POSTS'
    }
}

export const setPosts = (posts: Post[]): PostActionTypes => {
    return {
        type: 'SET_POSTS',
        payload: posts
    }
}

export const setLessons = (lessonNames: string[]): PostActionTypes => {
    return {
        type: 'SET_LESSONS',
        payload: lessonNames
    }
}

export const setCategories = (categories: string[]): PostActionTypes => {
    return {
        type: 'SET_CATEGORIES',
        payload: categories
    }
}

export const setTags = (tags: string[]): PostActionTypes => {
    return {
        type: 'SET_TAGS',
        payload: tags
    }
}

export const setCurrentPost = (post: PostPayload): PostActionTypes => {
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
