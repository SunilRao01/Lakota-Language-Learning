import {PostActionTypes} from "./Posts.action";

export interface Post {
    id: number,
    postContent: string,
    creationDate: Date,
    categories: string[],
    tags: string[]
}

export interface PostState {
    posts: Post[]
}

export interface RootState {
    postState: PostState
}

const initialState: PostState = {
    posts: [{
        id: 0,
        postContent: 'Sample post',
        creationDate: new Date(2019, 5, 1),
        categories: ['test category', 'test category 2'],
        tags: ['test tag', 'test tag 2']
    }]
};

export const postReducer = (
    state = initialState,
    action: PostActionTypes
): PostState => {
    switch (action.type) {
        case 'ADD_POST': {
            return {
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

            return index > -1 ? {
                posts: state.posts.splice(index, 1)
            } : state
        }
        default:
            return state
    }
};
