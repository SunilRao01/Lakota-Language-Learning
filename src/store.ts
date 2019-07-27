import {combineReducers, createStore} from 'redux';
import {initialPostState, postReducer, PostState} from './redux/Posts/Posts.reducer';
import {filterReducer, FilterState, initialFilterState} from './redux/Filter/Filter.reducer'

export interface RootState {
    postState: PostState,
    filterState: FilterState
}

export const initialRootState: RootState = {
    postState: initialPostState,
    filterState: initialFilterState
}

const rootReducer = combineReducers({
    postState: postReducer,
    filterState: filterReducer
});

export const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
