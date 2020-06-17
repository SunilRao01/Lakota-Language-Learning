import {
    addPosts,
    deletePost,
    PostActionTypes,
    setCategories,
    setCurrentPost,
    setLessons,
    addLesson,
    setPosts,
    setTags,
    setUpdatingPostLoading,
    setWordOfTheDayPosts, deleteLesson
} from './Posts.action';
import axios, {AxiosResponse} from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../../store'

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

export interface PostState {
    posts: Post[],
    updatingPostLoading: boolean,
    currentPost?: Post,
    lessons: { id: number, lesson: string }[],
    categories?: string[]
    tags?: string[],
    wordOfTheDayPosts?: Post[],
    loadingPosts: boolean
}

export const initialPostState: PostState = {
    posts: [],
    updatingPostLoading: false,
    lessons: [],
    loadingPosts: false
};

const apiUrl = process.env.API_URL ? process.env.API_URL : 'http://localhost:4000'

export const backendGetPosts = (pageNumber: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`${apiUrl}/posts?page=${pageNumber}`).then((res: any) => {
            dispatch(setPosts(res.data.posts))

            Promise.resolve(res.data)
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetLessons = (): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`${apiUrl}/lessons`).then((res: any) => {
            dispatch(setLessons(res.data.data))
            return Promise.resolve(res.data.data)
        }).catch(err => {
            console.error(err)
            return Promise.reject(err)
        })
    }
}

export const backendAddLesson = (lesson: string, jwt: string): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios.post(
            `${apiUrl}/lessons`,
            {
                lesson: {
                    lesson: lesson
                }
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        ).then((res: AxiosResponse) => {
            dispatch(addLesson(res.data.data))
            Promise.resolve(res.data)
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendDeleteLesson = (lessonId: number, jwt: string): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios.delete(
            `${apiUrl}/lessons/${lessonId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        ).then((res: AxiosResponse) => {
            dispatch(deleteLesson(lessonId))
            Promise.resolve(res.data)
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetCategories = (): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios.get(`${apiUrl}/categories`).then((res: any) => {
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
        axios.get(`${apiUrl}/tags`).then((res: any) => {
            dispatch(setTags(res.data))
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetPostsByLessons = (lessons: string[]): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        let categoryParams = ``
        lessons.forEach((l, i) => {
            if (i === 0) {
                categoryParams = `?category[]=${l}`
            } else {
                categoryParams += `&category[]=${l}`
            }
        })

        return axios.get(`${apiUrl}/posts${categoryParams}`).then((res: any) => {
            dispatch(addPosts(res.data.posts))
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendGetWordOfTheDayPosts = (pageNumber?: number): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    const uri = `${apiUrl}/posts${pageNumber ? `?page=${pageNumber}` : ``}&category[]=word of the day`

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
    const uri = `${apiUrl}/posts${pageNumber ? `?page=${pageNumber}` : ``}${(categories && categories.length > 0) ? categories.map(c => `&category[]=${c}`).join('') : ``}${(tags && tags.length > 0) ? tags.map(t => `&tag[]=${t}`).join('') : ``}`

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

        axios.post(`${apiUrl}/post`, newPost, {
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

export const backendUpdatePost = (postId: number, updatedPost: Post, jwt: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch(setUpdatingPostLoading(true))

        axios.patch(`${apiUrl}/post/${postId}`, updatedPost, {
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
        return axios.get(`${apiUrl}/post/${postId}`).then((res: any) => {
            dispatch(setCurrentPost(res.data))
        }).catch(err => {
            console.error(err)
            Promise.reject(err)
        })
    }
}

export const backendDeletePost = (inputPostId: number, jwt: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.delete(`${apiUrl}/post/${inputPostId}`, {
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
            let newPosts = action.payload;
            // Don't add duplicate posts
            newPosts = newPosts.filter(p => !state.posts.find(fp => fp.id !== p.id))

            return {
                ...state,
                posts: [
                    ...state.posts,
                    ...newPosts
                ]
            }
        }
        case 'SET_LESSONS': {
            return {
                ...state,
                lessons: action.payload
            }
        }
        case 'ADD_LESSON': {
            return {
                ...state,
                lessons: [...state.lessons, action.payload]
            }
        }
        case 'DELETE_LESSON': {
            let newLessons = state.lessons.filter(l => l.id !== action.payload)

            return {
                ...state,
                lessons: newLessons
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
                currentPost: action.payload
            }
        }
        case 'SET_UPDATING_POST_LOADING': {
            return {
                ...state,
                updatingPostLoading: action.payload
            }
        }
        case 'SET_POST_LOADING': {
            return {
                ...state,
                loadingPosts: action.payload
            }
        }
        default:
            return state
    }
};
