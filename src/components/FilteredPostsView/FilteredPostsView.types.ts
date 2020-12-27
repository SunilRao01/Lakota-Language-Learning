import {
    backendGetPostsByFilters,
    Post,
} from '../../redux/Posts/Posts.reducer';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { clearPosts, setPostLoading } from '../../redux/Posts/Posts.action';

interface FilteredPostsViewOwnProps {
    posts: Post[];
    postsLoading: boolean;
}

interface FilteredPostsViewActions {
    getPostsByFilter: (
        pageNumber: number,
        categories?: string[],
        tags?: string[]
    ) => void;
    clearPosts: () => void;
    setPostLoading: (loading: boolean) => void;
}

export type FilteredPostsViewPropsAndActions = RouteComponentProps &
    FilteredPostsViewOwnProps &
    FilteredPostsViewActions;

export const mapStateToProps = (
    state: RootState
): FilteredPostsViewOwnProps => {
    return {
        posts: state.postState.posts,
        postsLoading: state.postState.loadingPosts,
    };
};

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): FilteredPostsViewActions => {
    return {
        getPostsByFilter: async (
            pageNumber: number,
            categories?: string[],
            tags?: string[]
        ) => {
            await dispatch(
                backendGetPostsByFilters(
                    pageNumber,
                    categories ? categories : [],
                    tags ? tags : []
                )
            );
        },
        clearPosts: () => dispatch(clearPosts()),
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};