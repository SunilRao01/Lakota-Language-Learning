import {RootState} from "../../../redux/store";
import {ThunkDispatch} from "redux-thunk";
import {
    backendAddGrammar,
    backendDeleteGrammar,
    backendGetCategories,
    backendGetGrammar
} from "../../../redux/Posts/Posts.reducer";
import {setPostLoading} from "../../../redux/Posts/Posts.action";

interface AdminGrammarProps {
    grammar: { id: number; grammar: string }[];
    categories: string[];
    jwt: string;
    postsLoading: boolean;
}

interface AdminGrammarActions {
    getGrammar: () => void;
    getCategories: () => void;
    addGrammar: (grammar: string, jwt: string) => void;
    deleteGrammar: (grammarId: number, jwt: string) => void;
    setPostLoading: (loading: boolean) => void;
}

export type AdminGrammarPropsAndActions = AdminGrammarProps & AdminGrammarActions;

export const mapStateToProps = (state: RootState): AdminGrammarProps => {
    return {
        grammar: state.postState.grammar,
        categories: state.postState.categories
            ? state.postState.categories
            : [],
        jwt: state.adminState.jwt,
        postsLoading: state.postState.loadingPosts,
    };
};

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminGrammarActions => {
    return {
        getGrammar: async () => {
            await dispatch(backendGetGrammar());
        },
        getCategories: async () => {
            await dispatch(backendGetCategories());
        },
        addGrammar: async (grammar: string, jwt: string) => {
            await dispatch(backendAddGrammar(grammar, jwt));
        },
        deleteGrammar: async (grammarId: number, jwt: string) => {
            await dispatch(backendDeleteGrammar(grammarId, jwt));
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};