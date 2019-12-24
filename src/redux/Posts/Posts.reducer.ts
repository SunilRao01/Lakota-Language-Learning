import {
    addPosts,
    deletePost,
    PostActionTypes,
    setCategories,
    setCurrentPost,
    setPosts, setTags,
    setUpdatingPostLoading, setWordOfTheDayPosts
} from './Posts.action';
import axios from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../../store'

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
    currentPost?: Post,
    lessons: string[],
    categories?: string[]
    tags?: string[],
    wordOfTheDayPosts?: Post[]
}

export const initialPostState: PostState = {
    posts: [],
    updatingPostLoading: false,
    lessons: ['cat1']
};

export const backendGetPosts = (pageNumber: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`http://${apiUrl}:4000/posts?page=${pageNumber}`).then((res: any) => {
            console.log('dispatching action...', res.data.posts)
            dispatch(setPosts(res.data.posts))

            Promise.resolve(res.data)
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetCategories = (): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios.get(`http://${apiUrl}:4000/categories`).then((res: any) => {
            dispatch(setCategories(res.data))

            Promise.resolve(res.data)
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetTags = (): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios.get(`http://${apiUrl}:4000/tags`).then((res: any) => {
            dispatch(setTags(res.data))
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetPostsByLessons = (): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        let categoryParams = ``
        getState().postState.lessons.forEach((l, i) =>
            i == 0
                ? categoryParams = `?category=${l}`
                : categoryParams += `&category=${l}`)

        return axios.get(`http://${apiUrl}:4000/posts${categoryParams}`).then((res: any) => {
            dispatch(addPosts(res.data.posts))
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetWordOfTheDayPosts = (pageNumber?: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    const uri = `http://${apiUrl}:4000/posts${pageNumber ? `?page=${pageNumber}` : ``}&category[]=word of the day`

    return async (dispatch: Dispatch) => {
        return axios.get(uri).then((res: any) => {
            dispatch(setWordOfTheDayPosts(res.data.posts))
            Promise.resolve(res.data)
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetPostsByFilters = (pageNumber?: number, categories?: string[], tags?: string[]): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    const uri = `http://${apiUrl}:4000/posts${pageNumber ? `?page=${pageNumber}` : ``}${(categories && categories.length > 0) ? categories.map(c => `&category[]=${c}`).join('') : ``}${(tags && tags.length > 0) ? tags.map(t => `&tag[]=${t}`).join('') : ``}`

    return async (dispatch: Dispatch) => {
        return axios.get(uri).then((res: any) => {
            dispatch(setPosts(res.data.posts))
            Promise.resolve(res.data)
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
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
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
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
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetPost = (postId: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`http://${apiUrl}:4000/post/${postId}`).then((res: any) => {
            dispatch(setCurrentPost(res.data))
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
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
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
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
                posts: action.payload
            }
        }
        case 'SET_WORD_OF_THE_DAY_POSTS': {
            return {
                ...state,
                wordOfTheDayPosts: action.payload
            }
        }
        case 'ADD_POSTS': {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    ...action.payload
                ]
            }
        }
        case 'SET_LESSONS': {
            return {
                ...state,
                lessons: action.payload
            }
        }
        case 'SET_CATEGORIES': {
            return {
                ...state,
                categories: action.payload
            }
        }
        case 'SET_TAGS': {
            return {
                ...state,
                tags: action.payload
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
        case 'CLEAR_POSTS': {
            return {
                ...state,
                posts: []
            }
        }
        case 'SET_CURRENT_POST': {
            return {
                ...state,
                currentPost: {
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
