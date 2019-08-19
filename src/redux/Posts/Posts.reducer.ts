import {PostActionTypes, setPosts} from './Posts.action';
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
    posts: Post[]
}

export const initialPostState: PostState = {
    posts: []
};

export const backendGetPosts = (pageNumber: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`http://localhost:4000/posts?page=${pageNumber}`)
            .then((res: any) => {
                console.log('backend finished: ', res.data.posts)
                dispatch(setPosts(res.data.posts))
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
            console.log('@reducer, setting posts to: ', action.payload)

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
        default:
            return state
    }
};
