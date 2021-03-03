import { Post, Sitemap } from './Posts.reducer';

export interface GetPosts {
    type: 'GET_POSTS';
}

export interface SetPosts {
    type: 'SET_POSTS';
    payload: Post[];
}

export interface SetWordOfTheDayPosts {
    type: 'SET_WORD_OF_THE_DAY_POSTS';
    payload: Post[];
}

export interface AddPosts {
    type: 'ADD_POSTS';
    payload: Post[];
}

export interface SetLessons {
    type: 'SET_LESSONS';
    payload: { id: number; lesson: string }[];
}

export interface SetCategories {
    type: 'SET_CATEGORIES';
    payload: string[];
}

export interface SetTags {
    type: 'SET_TAGS';
    payload: string[];
}

export interface AddPost {
    type: 'ADD_POST';
    payload: Post;
}

export interface DeletePost {
    type: 'DELETE_POST';
    payload: number;
}

export interface ClearPosts {
    type: 'CLEAR_POSTS';
}

export interface SetCurrentPost {
    type: 'SET_CURRENT_POST';
    payload: Post;
}

export interface SetUpdatingPostLoading {
    type: 'SET_UPDATING_POST_LOADING';
    payload: boolean;
}

export interface SetUpdatingSitemapLoading {
    type: 'SET_UPDATING_SITEMAP_LOADING';
    payload: boolean;
}

export interface SetLessons {
    type: 'SET_LESSONS';
    payload: { id: number; lesson: string }[];
}

export interface AddLesson {
    type: 'ADD_LESSON';
    payload: { id: number; lesson: string };
}

export interface DeleteLesson {
    type: 'DELETE_LESSON';
    payload: number;
}

export interface SetPostLoading {
    type: 'SET_POST_LOADING';
    payload: boolean;
}

export interface SetGrammar {
    type: 'SET_GRAMMAR';
    payload: { id: number; grammar: string }[];
}

export interface AddGrammar {
    type: 'ADD_GRAMMAR';
    payload: { id: number; grammar: string };
}

export interface DeleteGrammar {
    type: 'DELETE_GRAMMAR';
    payload: number;
}

export interface SetVocabulary {
    type: 'SET_VOCABULARY';
    payload: { id: number; vocab: string }[];
}

export interface AddVocab {
    type: 'ADD_VOCAB';
    payload: { id: number; vocab: string };
}

export interface DeleteVocab {
    type: 'DELETE_VOCAB';
    payload: number;
}

export interface SetPodcasts {
    type: 'SET_PODCASTS';
    payload: { id: number; podcast: string }[];
}

export interface AddPodcast {
    type: 'ADD_PODCAST';
    payload: { id: number; podcast: string };
}

export interface DeletePodcast {
    type: 'DELETE_PODCAST';
    payload: number;
}

export interface SetSitemap {
    type: 'SET_SITEMAP';
    payload: Sitemap;
}

export type PostActionTypes =
    | GetPosts
    | SetPosts
    | SetCategories
    | SetTags
    | AddPosts
    | AddPost
    | DeletePost
    | ClearPosts
    | SetCurrentPost
    | SetUpdatingPostLoading
    | SetUpdatingSitemapLoading
    | SetWordOfTheDayPosts
    | SetLessons
    | AddLesson
    | DeleteLesson
    | SetPostLoading
    | SetGrammar
    | AddGrammar
    | DeleteGrammar
    | SetVocabulary
    | AddVocab
    | DeleteVocab
    | SetPodcasts
    | AddPodcast
    | DeletePodcast
    | SetSitemap;

export const getPosts = (): PostActionTypes => {
    return {
        type: 'GET_POSTS',
    };
};

export const addPost = (newPost: Post): PostActionTypes => {
    return {
        type: 'ADD_POST',
        payload: newPost,
    };
};

export const deletePost = (postId: number): PostActionTypes => {
    return {
        type: 'DELETE_POST',
        payload: postId,
    };
};

export const clearPosts = (): PostActionTypes => {
    return {
        type: 'CLEAR_POSTS',
    };
};

export const setPosts = (posts: Post[]): PostActionTypes => {
    return {
        type: 'SET_POSTS',
        payload: posts,
    };
};

export const setWordOfTheDayPosts = (posts: Post[]): PostActionTypes => {
    return {
        type: 'SET_WORD_OF_THE_DAY_POSTS',
        payload: posts,
    };
};

export const addPosts = (posts: Post[]): PostActionTypes => {
    return {
        type: 'ADD_POSTS',
        payload: posts,
    };
};

export const setCategories = (categories: string[]): PostActionTypes => {
    return {
        type: 'SET_CATEGORIES',
        payload: categories,
    };
};

export const setTags = (tags: string[]): PostActionTypes => {
    return {
        type: 'SET_TAGS',
        payload: tags,
    };
};

export const setLessons = (
    lessons: { id: number; lesson: string }[]
): PostActionTypes => {
    return {
        type: 'SET_LESSONS',
        payload: lessons,
    };
};

export const addLesson = (lesson: {
    id: number;
    lesson: string;
}): PostActionTypes => {
    return {
        type: 'ADD_LESSON',
        payload: lesson,
    };
};

export const deleteLesson = (lessonId: number): PostActionTypes => {
    return {
        type: 'DELETE_LESSON',
        payload: lessonId,
    };
};

export const setPodcasts = (
    podcasts: { id: number; podcast: string }[]
): PostActionTypes => {
    return {
        type: 'SET_PODCASTS',
        payload: podcasts,
    };
};

export const addPodcast = (podcast: {
    id: number;
    podcast: string;
}): PostActionTypes => {
    return {
        type: 'ADD_PODCAST',
        payload: podcast,
    };
};

export const deletePodcast = (podcastId: number): PostActionTypes => {
    return {
        type: 'DELETE_PODCAST',
        payload: podcastId,
    };
};

export const setGrammar = (
    grammar: { id: number; grammar: string }[]
): PostActionTypes => {
    return {
        type: 'SET_GRAMMAR',
        payload: grammar,
    };
};

export const addGrammar = (grammar: {
    id: number;
    grammar: string;
}): PostActionTypes => {
    return {
        type: 'ADD_GRAMMAR',
        payload: grammar,
    };
};

export const deleteGrammar = (grammarId: number): PostActionTypes => {
    return {
        type: 'DELETE_GRAMMAR',
        payload: grammarId,
    };
};

export const setVocabulary = (
    vocabulary: { id: number; vocab: string }[]
): PostActionTypes => {
    return {
        type: 'SET_VOCABULARY',
        payload: vocabulary,
    };
};

export const addVocab = (vocab: {
    id: number;
    vocab: string;
}): PostActionTypes => {
    return {
        type: 'ADD_VOCAB',
        payload: vocab,
    };
};

export const deleteVocab = (vocabId: number): PostActionTypes => {
    return {
        type: 'DELETE_VOCAB',
        payload: vocabId,
    };
};

export const setCurrentPost = (post: Post): PostActionTypes => {
    return {
        type: 'SET_CURRENT_POST',
        payload: post,
    };
};

export const setUpdatingPostLoading = (status: boolean): PostActionTypes => {
    return {
        type: 'SET_UPDATING_POST_LOADING',
        payload: status,
    };
};

export const setUpdatingSitemapLoading = (status: boolean): PostActionTypes => {
    return {
        type: 'SET_UPDATING_SITEMAP_LOADING',
        payload: status,
    };
};

export const setPostLoading = (loading: boolean): PostActionTypes => {
    return {
        type: 'SET_POST_LOADING',
        payload: loading,
    };
};

export const setSitemap = (sitemap: Sitemap): PostActionTypes => {
    return {
        type: 'SET_SITEMAP',
        payload: sitemap,
    };
};
