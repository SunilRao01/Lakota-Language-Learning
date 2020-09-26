import {
    backendGetVocabulary,
    backendGetPostsByFilters,
    Post
} from "../../redux/Posts/Posts.reducer";
import {RouteComponentProps} from "react-router";
import {RootState} from "../../redux/store";
import {ThunkDispatch} from "redux-thunk";
import {clearPosts, setPostLoading} from "../../redux/Posts/Posts.action";

export interface VocabularyProps {
    posts: Post[];
    vocabulary: { id: number; vocab: string }[];
    postsLoading: boolean;
}

export interface VocabularyActions {
    getPostsForVocab: (vocab: string, pageNumber: number) => any;
    clearPosts: () => void;
    getVocabulary: () => any;
    setPostLoading: (loading: boolean) => void;
}

export type VocabularyPropsAndActions = VocabularyProps &
    VocabularyActions &
    RouteComponentProps;

export const mapStateToProps = (state: RootState): VocabularyProps => ({
    posts: state.postState.posts,
    vocabulary: state.postState.vocabulary,
    postsLoading: state.postState.loadingPosts,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): VocabularyActions => {
    return {
        getPostsForVocab: async (vocab: string, pageNumber: number) => {
            return await dispatch(backendGetPostsByFilters(
                pageNumber,
                [vocab]
            ));
        },
        clearPosts: () => dispatch(clearPosts()),
        getVocabulary: async () => {
            return await dispatch(backendGetVocabulary());
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};