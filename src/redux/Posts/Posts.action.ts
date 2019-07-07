import {Post} from "./Posts.reducer";

export interface GetPosts {
    type: 'GET_POSTS'
}

export interface AddPost {
    type: 'ADD_POST',
    payload: Post
}

export interface DeletePost {
    type: 'DELETE_POST',
    payload: number
}

export type PostActionTypes = GetPosts | AddPost | DeletePost

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
