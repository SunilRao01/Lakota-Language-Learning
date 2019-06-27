import {Post} from "./Posts.reducer";

interface AddPost {
    type: 'ADD_POST',
    payload: Post
}

interface DeletePost {
    type: 'DELETE_POST',
    payload: number
}

export type PostActionTypes = AddPost | DeletePost

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
