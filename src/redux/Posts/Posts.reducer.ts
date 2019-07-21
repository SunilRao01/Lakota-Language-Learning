import {PostActionTypes} from "./Posts.action";

export interface Post {
    id: number,
    postTitle: string,
    postContent: string,
    creationDate: Date,
    categories: string[],
    tags: string[]
}

export interface PostState {
    posts: Post[],
    tags: Set<string>,
    categories: Set<string>
}

export const initialPostState: PostState = {
    posts: [{
        id: 0,
        postTitle: 'Lakota Grammar 1',
        postContent: 'Sample post',
        creationDate: new Date(2019, 5, 1),
        categories: ['test category', 'test category 2'],
        tags: ['test tag', 'test tag 2']
    }, {
        id: 1,
        postTitle: 'Origins of Lakota',
        postContent: 'Sample post',
        creationDate: new Date(2019, 5, 1),
        categories: ['test category', 'test category 2'],
        tags: ['test tag', 'test tag 2']
    }, {
        id: 2,
        postTitle: 'Regional Dialectics',
        postContent: 'Sample post',
        creationDate: new Date(2019, 5, 1),
        categories: ['test category', 'test category 2'],
        tags: ['test tag', 'test tag 2']
    }],
    tags: new Set([]),
    categories: new Set([])
};

export const postReducer = (
    state = initialPostState,
    action: PostActionTypes
): PostState => {
    switch (action.type) {
        case 'GET_POSTS': {
            // TODO: Create async call to get posts from backend
            const sourcePosts = state.posts
            let outputPosts: Post[] = []
            let outputTags: Set<string> = new Set()
            let outputCategories: Set<string> = new Set()

            sourcePosts.forEach(p => {
                outputPosts.push(p)
                p.tags.forEach(t => outputTags.add(t))
                p.categories.forEach(c => outputCategories.add(c))
            })

            return {
                ...state,
                posts: outputPosts,
                tags: outputTags,
                categories: outputCategories
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
