import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {
    initialPostState,
    postReducer,
    PostState,
} from 'redux/Posts/Posts.reducer';
import {
    filterReducer,
    FilterState,
    initialFilterState,
} from 'redux/Filter/Filter.reducer';
import thunk from 'redux-thunk';
import {
    adminReducer,
    AdminState,
    initialAdminState,
} from 'redux/Admin/Admin.reducer';

export interface RootState {
    postState: PostState;
    filterState: FilterState;
    adminState: AdminState;
}

export const initialRootState: RootState = {
    postState: initialPostState,
    filterState: initialFilterState,
    adminState: initialAdminState,
};

export const rootReducer = combineReducers({
    postState: postReducer,
    filterState: filterReducer,
    adminState: adminReducer,
});

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
export const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
