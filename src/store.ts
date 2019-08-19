import {applyMiddleware, combineReducers, createStore} from 'redux';
import {initialPostState, postReducer, PostState} from './redux/Posts/Posts.reducer';
import {filterReducer, FilterState, initialFilterState} from './redux/Filter/Filter.reducer'
import thunk from 'redux-thunk'

export interface RootState {
    postState: PostState,
    filterState: FilterState
}

export const initialRootState: RootState = {
    postState: initialPostState,
    filterState: initialFilterState
}

export const rootReducer = combineReducers({
    postState: postReducer,
    filterState: filterReducer
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
