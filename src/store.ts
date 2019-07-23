import {combineReducers, createStore} from 'redux';
import {initialPostState, postReducer, PostState} from './redux/Posts/Posts.reducer';
import {filterReducer, FilterState, startingFilterState} from './redux/Filter/Filter.reducer'

export interface RootState {
    postState: PostState,
    filterState: FilterState
}

export const startingRootState: RootState = {
    postState: initialPostState,
    filterState: startingFilterState
}

const rootReducer = combineReducers({
    postState: postReducer,
    filterState: filterReducer
});

export const store = createStore(rootReducer);
