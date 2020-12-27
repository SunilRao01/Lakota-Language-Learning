import {RootState} from "../../../redux/store";
import {ThunkDispatch} from "redux-thunk";
import {
    backendAddVocab,
    backendDeleteVocab,
    backendGetCategories,
    backendGetVocabulary,
} from "../../../redux/Posts/Posts.reducer";
import {setPostLoading} from "../../../redux/Posts/Posts.action";

interface AdminVocabularyProps {
    vocabulary: { id: number; vocab: string }[];
    categories: string[];
    jwt: string;
    postsLoading: boolean;
}

interface AdminVocabularyActions {
    getVocab: () => void;
    getCategories: () => void;
    addVocab: (vocab: string, jwt: string) => void;
    deleteVocab: (vocabId: number, jwt: string) => void;
    setPostLoading: (loading: boolean) => void;
}

export type AdminVocabularyPropsAndActions = AdminVocabularyProps & AdminVocabularyActions;

export const mapStateToProps = (state: RootState): AdminVocabularyProps => {
    return {
        vocabulary: state.postState.vocabulary,
        categories: state.postState.categories
            ? state.postState.categories
            : [],
        jwt: state.adminState.jwt,
        postsLoading: state.postState.loadingPosts,
    };
};

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminVocabularyActions => {
    return {
        getVocab: async () => {
            await dispatch(backendGetVocabulary());
        },
        getCategories: async () => {
            await dispatch(backendGetCategories());
        },
        addVocab: async (vocab: string, jwt: string) => {
            await dispatch(backendAddVocab(vocab, jwt));
        },
        deleteVocab: async (vocabId: number, jwt: string) => {
            await dispatch(backendDeleteVocab(vocabId, jwt));
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};