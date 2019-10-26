import {deletePost, PostActionTypes, setCurrentPost, setPosts, setUpdatingPostLoading} from './Posts.action';
import axios from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from 'redux-thunk'

const apiUrl = process.env.NODE_ENV !== 'production' ? 'localhost' : '67.205.165.131'

export interface IQuiz {
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
    quizzes?: IQuiz[],
    podcastLink?: string
}

export interface PostPayload {
    id: number,
    title: string,
    content: string,
    creationDate: string,
    categories: string[],
    tags: string[],
    quizzes?: IQuiz[],
    podcastLink?: string
}

export interface PostState {
    posts: Post[],
    updatingPostLoading: boolean,
    currentPost?: Post
}

export const initialPostState: PostState = {
    posts: [],
    updatingPostLoading: false
};


export const backendGetPosts = (pageNumber: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`http://${apiUrl}:4000/posts?page=${pageNumber}`).then((res: any) => {
            dispatch(setPosts(res.data.posts))
        })
    }
}

export const backendCreatePost = (newPost: Post, jwt: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch(setUpdatingPostLoading(true))

        axios.post(`http://${apiUrl}:4000/post`, newPost, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(() => {
            dispatch(setUpdatingPostLoading(false))
        })
    }
}

export const backendUpdatePost = (postId: number, updatedPost: PostPayload, jwt: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch(setUpdatingPostLoading(true))

        axios.put(`http://${apiUrl}:4000/post/${postId}`, updatedPost, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(() => {
            dispatch(setUpdatingPostLoading(false))
        })
    }
}

export const backendGetPost = (postId: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`http://${apiUrl}:4000/post/${postId}`).then((res: any) => {
            dispatch(setCurrentPost(res.data))
        })
    }
}

export const backendDeletePost = (inputPostId: number, jwt: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.delete(`http://${apiUrl}:4000/post/${inputPostId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(() => {
            dispatch(deletePost(inputPostId))
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
                let newPosts = state.posts;
                newPosts.splice(index, 1)
                return {
                    ...state,
                    posts: newPosts
                }
            }

            return state
        }
        case 'SET_CURRENT_POST': {
            return {
                ...state,
                currentPost:  {
                    ...action.payload,
                    content: action.payload.content
                }
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
