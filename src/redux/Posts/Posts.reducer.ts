import {PostActionTypes} from "./Posts.action";

export interface Quiz {
    questions: [{
        question: string,
        answers: string[],
        answer: string
    }]
}

export interface Post {
    id: number,
    postTitle: string,
    postContent: string,
    creationDate: Date,
    categories: string[],
    tags: string[],
    quizzes?: Quiz
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
        postContent: 'Sample post 1',
        creationDate: new Date(2019, 5, 1),
        categories: ['Grammar Lesson'],
        tags: ['grammar', 'unit lesson'],
        quizzes: {
            questions: [{
                question: 'What is the answer?',
                answers: ['same', 'as it', 'ever was?'],
                answer: 'ever was?'
            }]
        }
    }, {
        id: 1,
        postTitle: 'Origins of Lakota Action Words',
        postContent: 'Sample post 2',
        creationDate: new Date(2019, 5, 1),
        categories: ['Vocabulary Lesson'],
        tags: ['history'],
        quizzes: {
            questions: [{
                question: 'What is the answer?',
                answers: ['same', 'as it', 'ever was?'],
                answer: 'ever was?'
            }]
        }
    }, {
        id: 2,
        postTitle: 'Regional Dialectics',
        postContent: 'Sample post 3',
        creationDate: new Date(2019, 5, 1),
        categories: ['Grammar Lesson'],
        tags: ['geography', 'history'],
        quizzes: {
            questions: [{
                question: 'What is the answer?',
                answers: ['same', 'as it', 'ever was?'],
                answer: 'ever was?'
            }]
        }
    }, {
        id: 3,
        postTitle: 'Word of the Day: Lemons',
        postContent: 'Lemons are yummy.',
        creationDate: new Date(2019, 5, 1),
        categories: ['Vocabulary Lesson'],
        tags: ['word of the day', 'food', 'semantics', 'spelling'],
        quizzes: {
            questions: [{
                question: 'What is the answer?',
                answers: ['same', 'as it', 'ever was?'],
                answer: 'ever was?'
            }]
        }
    }, {
        id: 4,
        postTitle: 'Word of the Day: Lakota',
        postContent: 'Lakota is a word.',
        creationDate: new Date(2019, 5, 1),
        categories: ['Vocabulary Lesson'],
        tags: ['word of the day', 'history', 'spelling', 'geography'],
        quizzes: {
            questions: [{
                question: 'What is the answer?',
                answers: ['same', 'as it', 'ever was?'],
                answer: 'ever was?'
            }]
        }
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
