import {RootState} from "../../../redux/store";
import {ThunkDispatch} from "redux-thunk";
import {
    backendAddPodcast,
    backendDeletePodcast,
    backendGetCategories,
    backendGetPodcasts
} from "../../../redux/Posts/Posts.reducer";
import {setPostLoading} from "../../../redux/Posts/Posts.action";

interface AdminPodcastProps {
    podcasts: { id: number; podcast: string }[];
    categories: string[];
    jwt: string;
    postsLoading: boolean;
}

interface AdminPodcastActions {
    getPodcasts: () => void;
    getCategories: () => void;
    addPodcast: (podcast: string, jwt: string) => void;
    deletePodcast: (podcastId: number, jwt: string) => void;
    setPostLoading: (loading: boolean) => void;
}

export type AdminPodcastsPropsAndActions = AdminPodcastProps & AdminPodcastActions;

export const mapStateToProps = (state: RootState): AdminPodcastProps => {
    return {
        podcasts: state.postState.podcasts,
        categories: state.postState.categories
            ? state.postState.categories
            : [],
        jwt: state.adminState.jwt,
        postsLoading: state.postState.loadingPosts,
    };
};

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminPodcastActions => {
    return {
        getPodcasts: async () => {
            await dispatch(backendGetPodcasts());
        },
        getCategories: async () => {
            await dispatch(backendGetCategories());
        },
        addPodcast: async (podcast: string, jwt: string) => {
            await dispatch(backendAddPodcast(podcast, jwt));
        },
        deletePodcast: async (podcastId: number, jwt: string) => {
            await dispatch(backendDeletePodcast(podcastId, jwt));
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};