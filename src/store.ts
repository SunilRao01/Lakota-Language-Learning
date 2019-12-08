import {applyMiddleware, combineReducers, createStore} from 'redux';
import {initialPostState, postReducer, PostState} from './redux/Posts/Posts.reducer';
import {filterReducer, FilterState, initialFilterState} from './redux/Filter/Filter.reducer'
import thunk from 'redux-thunk'
import {adminReducer, AdminState, initialAdminState} from './redux/Admin/Admin.reducer'

export interface RootState {
    postState: PostState,
    filterState: FilterState,
    adminState: AdminState
}

export const initialRootState: RootState = {
    postState: initialPostState,
    filterState: initialFilterState,
    adminState: initialAdminState
}

export const rootReducer = combineReducers({
    postState: postReducer,
    filterState: filterReducer,
    adminState: adminReducer
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
