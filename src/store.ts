import {combineReducers, createStore} from "redux";
import {initialPostState, postReducer, PostState} from './redux/Posts/Posts.reducer';

export interface RootState {
    postState: PostState
}

export const startingRootState: RootState = {
    postState: initialPostState
}

const rootReducer = combineReducers({
    postState: postReducer
});

export const store = createStore(rootReducer);
