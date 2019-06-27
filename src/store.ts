import {combineReducers, createStore} from "redux";
import {postReducer} from "./Posts.reducer";

const rootReducer = combineReducers({
    postState: postReducer
});

export const store = createStore(rootReducer);
