import {
    backendGetGrammar,
    backendGetPostsByFilters,
    Post
} from "../../redux/Posts/Posts.reducer";
import {RouteComponentProps} from "react-router";
import {RootState} from "../../redux/store";
import {ThunkDispatch} from "redux-thunk";
import {clearPosts, setPostLoading} from "../../redux/Posts/Posts.action";

export interface GrammarProps {
    posts: Post[];
    grammar: { id: number; grammar: string }[];
    postsLoading: boolean;
}

export interface GrammarActions {
    getPostsForGrammar: (grammar: string, pageNumber: number) => any;
    clearPosts: () => void;
    getGrammar: () => any;
    setPostLoading: (loading: boolean) => void;
}

export type GrammarPropsAndActions = GrammarProps &
    GrammarActions &
    RouteComponentProps;

export const mapStateToProps = (state: RootState): GrammarProps => ({
    posts: state.postState.posts,
    grammar: state.postState.grammar,
    postsLoading: state.postState.loadingPosts,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): GrammarActions => {
    return {
        getPostsForGrammar: async (grammar: string, pageNumber: number) => {
            return await dispatch(backendGetPostsByFilters(
                pageNumber,
                [grammar]
            ));
        },
        clearPosts: () => dispatch(clearPosts()),
        getGrammar: async () => {
            return await dispatch(backendGetGrammar());
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};