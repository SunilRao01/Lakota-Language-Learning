import {PostActionTypes, setCurrentPost, setPosts, setUpdatingPostLoading} from './Posts.action';
import axios from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from 'redux-thunk'

export interface Quiz {
    question: string,
    possibleAnswers: string[],
    answer: string,
    successMessage: string,
    errorMessage: string
}

export interface Post {
    id: number,
    title: string,
    content: string,
    creationDate: string,
    categories: string[],
    tags: string[],
    quizzes?: Quiz[]
}

export interface PostState {
    posts: Post[],
    updatingPostLoading: boolean,
    currentPost: Post
}

export const initialPostState: PostState = {
    posts: [],
    updatingPostLoading: false,
    currentPost: {
        id: 0,
        creationDate: '',
        content: '',
        title: '',
        categories: [],
        tags: []
    }
};

export const backendGetPosts = (pageNumber: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`http://localhost:4000/posts?page=${pageNumber}`).then((res: any) => {
            dispatch(setPosts(res.data.posts))
        })
    }
}

export const backendUpdatePost = (updatedPost: Post, jwt: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch(setUpdatingPostLoading(true))

        axios.put(`http://localhost:4000/post/${updatedPost.id}`, updatedPost, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((res: any) => {
            dispatch(setUpdatingPostLoading(false))
        })
    }
}

export const backendGetPost = (postId: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`http://localhost:4000/post/${postId}`).then((res: any) => {
            dispatch(setCurrentPost(res.data))
        })
    }
}

export const postReducer = (
    state = initialPostState,
    action: PostActionTypes
): PostState => {
    switch (action.type) {
        case 'GET_POSTS': {
            return state
        }
        case 'SET_POSTS': {
            return {
                ...state,
                posts: action.payload as Post[]
            }
        }
        case 'ADD_POST': {
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        }
        case 'DELETE_POST': {
            let index: number = -1;
            state.posts.forEach((p: Post, i: number) => {
                if (p.id === action.payload) {
                    index = i
                }
            });

            if (index > -1) {
                state.posts.splice(index, 1)
            }

            return state
        }
        case 'SET_CURRENT_POST': {
            return {
                ...state,
                currentPost: action.payload
            }
        }
        case 'SET_UPDATING_POST_LOADING': {
            return {
                ...state,
                updatingPostLoading: action.payload
            }
        }
        default:
            return state
    }
};
