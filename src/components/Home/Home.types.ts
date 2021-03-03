import {
    backendGetCategories,
    apiGetPosts,
    backendGetTags,
    backendGetWordOfTheDayPosts,
    Post,
} from '../../redux/Posts/Posts.reducer';
import { RootState } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { setPostLoading } from '../../redux/Posts/Posts.action';
import { RouteComponentProps } from 'react-router';

interface HomeActions {
    getPosts: (pageNumber: number) => Promise<any>;
    getCategories: () => void;
    getTags: () => void;
    getWordOfTheDayPosts: () => void;
    setPostLoading: (loading: boolean) => void;
}

interface HomeProps {
    posts: Post[];
    wordOfTheDayPosts: Post[];
    categories: string[];
    tags: string[];
    postsLoading: boolean;
}

export type HomePropsWithActions = HomeProps &
    HomeActions &
    RouteComponentProps;

export const mapStateToProps = (state: RootState): HomeProps => ({
    posts: state.postState.posts,
    wordOfTheDayPosts: state.postState.wordOfTheDayPosts
        ? state.postState.wordOfTheDayPosts
        : [],
    categories: state.postState.categories ? state.postState.categories : [],
    tags: state.postState.tags ? state.postState.tags : [],
    postsLoading: state.postState.loadingPosts,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): HomeActions => {
    return {
        getPosts: async (pageNumber: number) => {
            await dispatch(apiGetPosts(pageNumber));
        },
        getCategories: async () => {
            await dispatch(backendGetCategories());
        },
        getTags: async () => {
            await dispatch(backendGetTags());
        },
        getWordOfTheDayPosts: async () => {
            await dispatch(backendGetWordOfTheDayPosts(1));
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};
