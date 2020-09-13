import {
    backendGetCategories,
    backendGetPosts,
    backendGetTags,
    backendGetWordOfTheDayPosts,
    Post
} from "../../redux/Posts/Posts.reducer";
import {RootState} from "../../redux/store";
import {ThunkDispatch} from "redux-thunk";
import {setPostLoading} from "../../redux/Posts/Posts.action";

interface HomeActions {
    getPosts: (pageNumber: number) => void;
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

export type HomePropsWithActions = HomeProps & HomeActions;

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
            await dispatch(backendGetPosts(pageNumber));
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