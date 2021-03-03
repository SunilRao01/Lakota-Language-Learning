import { RootState } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import {
    apiGetLessons,
    backendGetGrammar,
    backendGetPodcasts,
    backendGetVocabulary,
} from '../../redux/Posts/Posts.reducer';
import { setPostLoading } from '../../redux/Posts/Posts.action';

export interface MiniSitemapProps {
    lessons: { id: number; lesson: string }[];
    grammar: { id: number; grammar: string }[];
    vocabulary: { id: number; vocab: string }[];
    podcasts: { id: number; podcast: string }[];
    postsLoading: boolean;
}

export interface MiniSitemapActions {
    getLessons: () => any;
    getGrammar: () => any;
    getVocabulary: () => any;
    getPodcasts: () => any;
    setPostLoading: (loading: boolean) => void;
}

export type MiniSitemapPropsAndActions = MiniSitemapProps & MiniSitemapActions;

export const mapStateToProps = (state: RootState): MiniSitemapProps => ({
    grammar: state.postState.grammar,
    lessons: state.postState.lessons,
    podcasts: state.postState.podcasts,
    vocabulary: state.postState.vocabulary,
    postsLoading: state.postState.loadingPosts,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): MiniSitemapActions => {
    return {
        getGrammar: async () => {
            return await dispatch(backendGetGrammar());
        },
        getLessons: async () => {
            return await dispatch(apiGetLessons());
        },
        getPodcasts: async () => {
            return await dispatch(backendGetPodcasts());
        },
        getVocabulary: async () => {
            return await dispatch(backendGetVocabulary());
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};
