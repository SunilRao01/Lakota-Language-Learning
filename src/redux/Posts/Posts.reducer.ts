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
    setWordOfTheDayPosts,
    deleteLesson,
    setGrammar,
    addGrammar,
    deleteGrammar,
    setVocabulary,
    addVocab,
    deleteVocab,
    setPodcasts,
    addPodcast,
    deletePodcast,
    setSitemap,
    setUpdatingSitemapLoading,
} from './Posts.action';
import axios, { AxiosResponse } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'redux/store';

export interface IQuiz {
    question: string;
    possibleAnswers: string[];
    answer: string;
    successMessage: string;
    errorMessage: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    creationDate: string;
    categories: string[];
    tags: string[];
    quizzes?: IQuiz[];
    podcastLink?: string;
}

export interface Sitemap {
    title: string;
    content: string;
}

export interface PostState {
    posts: Post[];
    updatingPostLoading: boolean;
    updatingSitemapLoading: boolean;
    currentPost?: Post;
    sitemap?: Sitemap;
    lessons: { id: number; lesson: string }[];
    grammar: { id: number; grammar: string }[];
    vocabulary: { id: number; vocab: string }[];
    podcasts: { id: number; podcast: string }[];
    categories?: string[];
    tags?: string[];
    wordOfTheDayPosts?: Post[];
    loadingPosts: boolean;
}

export const initialPostState: PostState = {
    posts: [],
    updatingPostLoading: false,
    updatingSitemapLoading: false,
    lessons: [],
    grammar: [],
    vocabulary: [],
    podcasts: [],
    loadingPosts: false,
};

const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:4000';

export interface IGetPosts {
    posts: Post[];
}

export interface IGetLessons {
    lessons: string[];
}

export interface IAddLesson {
    lesson: {
        id: number;
        lesson: string;
    };
}

export const apiGetPosts = (
    pageNumber: number
): ThunkAction<Promise<IGetPosts>, RootState, null, PostActionTypes> => async (
    dispatch
) => {
    return axios
        .get(`${apiUrl}/posts?page=${pageNumber}`)
        .then((res: AxiosResponse<IGetPosts>) => {
            dispatch(setPosts(res.data.posts));

            return Promise.resolve(res.data);
        })
        .catch((err) => {
            console.error(err);
            return Promise.reject(err);
        });
};

export const apiGetLessons = (): ThunkAction<
    Promise<IGetLessons>,
    RootState,
    null,
    PostActionTypes
> => async (dispatch) => {
    return axios
        .get(`${apiUrl}/lessons`)
        .then((res: any) => {
            dispatch(setLessons(res.data.lessons));
            return Promise.resolve(res.data.lessons);
        })
        .catch((err) => {
            console.error(err);
            return Promise.reject(err);
        });
};

export const apiAddLesson = (
    lesson: string,
    jwt: string
): ThunkAction<Promise<IAddLesson>, RootState, null, PostActionTypes> => async (
    dispatch: Dispatch
) => {
    return axios
        .post(
            `${apiUrl}/lessons`,
            {
                lesson: {
                    lesson: lesson,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )
        .then((res: AxiosResponse) => {
            dispatch(addLesson(res.data.lesson));
            return Promise.resolve(res.data);
        })
        .catch((err) => {
            console.error(err);
            return Promise.reject(err);
        });
};

export const backendDeleteLesson = (
    lessonId: number,
    jwt: string
): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios
            .delete(`${apiUrl}/lessons/${lessonId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res: AxiosResponse) => {
                dispatch(deleteLesson(lessonId));
                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendGetSitemap = (): ThunkAction<
    Promise<any>,
    RootState,
    {},
    AnyAction
> => {
    return async (dispatch: Dispatch) => {
        return axios.get(`${apiUrl}/sitemap`).then((res: any) => {
            dispatch(setSitemap(res.data.data));
            return Promise.resolve(res.data.data);
        });
    };
};

export const backendGetPodcasts = (): ThunkAction<
    Promise<any>,
    RootState,
    {},
    AnyAction
> => {
    return async (dispatch: Dispatch) => {
        return axios
            .get(`${apiUrl}/podcasts`)
            .then((res: any) => {
                dispatch(setPodcasts(res.data.data));
                return Promise.resolve(res.data.data);
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    };
};

export const backendAddPodcast = (
    podcast: string,
    jwt: string
): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios
            .post(
                `${apiUrl}/podcasts`,
                {
                    podcast: {
                        podcast: podcast,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            .then((res: AxiosResponse) => {
                dispatch(addPodcast(res.data.data));
                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendDeletePodcast = (
    podcastId: number,
    jwt: string
): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios
            .delete(`${apiUrl}/podcasts/${podcastId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res: AxiosResponse) => {
                dispatch(deletePodcast(podcastId));
                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendGetGrammar = (): ThunkAction<
    Promise<any>,
    RootState,
    {},
    AnyAction
> => {
    return async (dispatch: Dispatch) => {
        return axios
            .get(`${apiUrl}/grammar`)
            .then((res: any) => {
                dispatch(setGrammar(res.data.data));
                return Promise.resolve(res.data.data);
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    };
};

export const backendAddGrammar = (
    grammar: string,
    jwt: string
): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios
            .post(
                `${apiUrl}/grammar`,
                {
                    grammar: {
                        grammar: grammar,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            .then((res: AxiosResponse) => {
                dispatch(addGrammar(res.data.data));
                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendDeleteGrammar = (
    grammarId: number,
    jwt: string
): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios
            .delete(`${apiUrl}/grammar/${grammarId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res: AxiosResponse) => {
                dispatch(deleteGrammar(grammarId));
                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendGetVocabulary = (): ThunkAction<
    Promise<any>,
    RootState,
    {},
    AnyAction
> => {
    return async (dispatch: Dispatch) => {
        return axios
            .get(`${apiUrl}/vocabulary`)
            .then((res: any) => {
                dispatch(setVocabulary(res.data.data));
                return Promise.resolve(res.data.data);
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    };
};

export const backendAddVocab = (
    vocab: string,
    jwt: string
): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios
            .post(
                `${apiUrl}/vocabulary`,
                {
                    vocab: {
                        vocab: vocab,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            .then((res: AxiosResponse) => {
                dispatch(addVocab(res.data.data));
                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendDeleteVocab = (
    vocabId: number,
    jwt: string
): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        axios
            .delete(`${apiUrl}/vocabulary/${vocabId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res: AxiosResponse) => {
                dispatch(deleteVocab(vocabId));
                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendGetCategories = (): ThunkAction<
    Promise<any>,
    RootState,
    {},
    AnyAction
> => {
    return async (dispatch: Dispatch) => {
        axios
            .get(`${apiUrl}/categories`)
            .then((res: any) => {
                dispatch(setCategories(res.data));

                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendGetTags = (): ThunkAction<
    Promise<any>,
    RootState,
    {},
    AnyAction
> => {
    return async (dispatch: Dispatch) => {
        axios
            .get(`${apiUrl}/tags`)
            .then((res: any) => {
                dispatch(setTags(res.data));
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendGetPostsByCategories = (
    lessons: string[]
): ThunkAction<Promise<any>, RootState, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        let categoryParams = ``;
        lessons.forEach((l, i) => {
            if (i === 0) {
                categoryParams = `?category[]=${l}`;
            } else {
                categoryParams += `&category[]=${l}`;
            }
        });

        return axios
            .get(`${apiUrl}/posts${categoryParams}`)
            .then((res: any) => {
                dispatch(addPosts(res.data.posts));
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendGetWordOfTheDayPosts = (
    pageNumber?: number
): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    const uri = `${apiUrl}/posts${
        pageNumber ? `?page=${pageNumber}` : ``
    }&category[]=word of the day`;

    return async (dispatch: Dispatch) => {
        return axios
            .get(uri)
            .then((res: any) => {
                dispatch(setWordOfTheDayPosts(res.data.posts));
                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendGetPostsByFilters = (
    pageNumber?: number,
    categories?: string[],
    tags?: string[]
): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    const uri = `${apiUrl}/posts${pageNumber ? `?page=${pageNumber}` : ``}${
        categories && categories.length > 0
            ? categories.map((c) => `&category[]=${c}`).join('')
            : ``
    }${tags && tags.length > 0 ? tags.map((t) => `&tag[]=${t}`).join('') : ``}`;

    return async (dispatch: Dispatch) => {
        return axios
            .get(uri)
            .then((res: any) => {
                dispatch(setPosts(res.data.posts));
                Promise.resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendCreatePost = (
    newPost: Post,
    jwt: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch(setUpdatingPostLoading(true));

        axios
            .post(`${apiUrl}/post`, newPost, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then(() => {
                dispatch(setUpdatingPostLoading(false));
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendUpdatePost = (
    postId: number,
    updatedPost: Post,
    jwt: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch(setUpdatingPostLoading(true));

        axios
            .patch(`${apiUrl}/post/${postId}`, updatedPost, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then(() => {
                dispatch(setUpdatingPostLoading(false));
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendUpdateSitemap = (
    updatedSitemap: Sitemap,
    jwt: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch(setUpdatingSitemapLoading(true));

        axios
            .patch(
                `${apiUrl}/sitemap`,
                {
                    sitemap: updatedSitemap,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            .then(() => {
                dispatch(setUpdatingSitemapLoading(false));
                Promise.resolve();
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendGetPost = (
    postId: number
): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios
            .get(`${apiUrl}/post/${postId}`)
            .then((res: any) => {
                dispatch(setCurrentPost(res.data));
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const backendDeletePost = (
    inputPostId: number,
    jwt: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios
            .delete(`${apiUrl}/post/${inputPostId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then(() => {
                dispatch(deletePost(inputPostId));
            })
            .catch((err) => {
                console.error(err);
                Promise.reject(err);
            });
    };
};

export const postReducer = (
    state = initialPostState,
    action: PostActionTypes
): PostState => {
    switch (action.type) {
        case 'GET_POSTS': {
            return state;
        }
        case 'SET_POSTS': {
            return {
                ...state,
                posts: action.payload,
            };
        }
        case 'SET_WORD_OF_THE_DAY_POSTS': {
            return {
                ...state,
                wordOfTheDayPosts: action.payload,
            };
        }
        case 'ADD_POSTS': {
            let newPosts = action.payload;
            // Don't add duplicate posts
            newPosts = newPosts.filter(
                (p) => !state.posts.find((fp) => fp.id !== p.id)
            );

            return {
                ...state,
                posts: [...state.posts, ...newPosts],
            };
        }
        case 'SET_LESSONS': {
            return {
                ...state,
                lessons: action.payload,
            };
        }
        case 'ADD_LESSON': {
            return {
                ...state,
                lessons: [...state.lessons, action.payload],
            };
        }
        case 'DELETE_LESSON': {
            let newLessons = state.lessons.filter(
                (l) => l.id !== action.payload
            );

            return {
                ...state,
                lessons: newLessons,
            };
        }
        case 'SET_PODCASTS': {
            return {
                ...state,
                podcasts: action.payload,
            };
        }
        case 'ADD_PODCAST': {
            return {
                ...state,
                podcasts: [...state.podcasts, action.payload],
            };
        }
        case 'DELETE_PODCAST': {
            let newPodcasts = state.podcasts.filter(
                (l) => l.id !== action.payload
            );

            return {
                ...state,
                podcasts: newPodcasts,
            };
        }
        case 'SET_GRAMMAR': {
            return {
                ...state,
                grammar: action.payload,
            };
        }
        case 'ADD_GRAMMAR': {
            return {
                ...state,
                grammar: [...state.grammar, action.payload],
            };
        }
        case 'DELETE_GRAMMAR': {
            let newGrammar = state.grammar.filter(
                (g) => g.id !== action.payload
            );

            return {
                ...state,
                grammar: newGrammar,
            };
        }
        case 'SET_VOCABULARY': {
            return {
                ...state,
                vocabulary: action.payload,
            };
        }
        case 'ADD_VOCAB': {
            return {
                ...state,
                vocabulary: [...state.vocabulary, action.payload],
            };
        }
        case 'DELETE_VOCAB': {
            let newVocabulary = state.vocabulary.filter(
                (v) => v.id !== action.payload
            );

            return {
                ...state,
                vocabulary: newVocabulary,
            };
        }
        case 'SET_CATEGORIES': {
            return {
                ...state,
                categories: action.payload,
            };
        }
        case 'SET_TAGS': {
            return {
                ...state,
                tags: action.payload,
            };
        }
        case 'ADD_POST': {
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        }
        case 'DELETE_POST': {
            let index: number = -1;
            state.posts.forEach((p: Post, i: number) => {
                if (p.id === action.payload) {
                    index = i;
                }
            });

            if (index > -1) {
                let newPosts = state.posts;
                newPosts.splice(index, 1);
                return {
                    ...state,
                    posts: newPosts,
                };
            }

            return state;
        }
        case 'CLEAR_POSTS': {
            return {
                ...state,
                posts: [],
            };
        }
        case 'SET_CURRENT_POST': {
            return {
                ...state,
                currentPost: action.payload,
            };
        }
        case 'SET_UPDATING_POST_LOADING': {
            return {
                ...state,
                updatingPostLoading: action.payload,
            };
        }
        case 'SET_UPDATING_SITEMAP_LOADING': {
            return {
                ...state,
                updatingSitemapLoading: action.payload,
            };
        }
        case 'SET_POST_LOADING': {
            return {
                ...state,
                loadingPosts: action.payload,
            };
        }
        case 'SET_SITEMAP': {
            return {
                ...state,
                sitemap: action.payload,
            };
        }
        default:
            return state;
    }
};
