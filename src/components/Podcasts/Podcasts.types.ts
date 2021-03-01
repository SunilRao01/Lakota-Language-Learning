import {
    backendGetPodcasts,
    backendGetPostsByFilters,
    Post,
} from '../../redux/Posts/Posts.reducer';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { clearPosts, setPostLoading } from '../../redux/Posts/Posts.action';

export interface PodcastsProps {
    posts: Post[];
    podcasts: { id: number; podcast: string }[];
    postsLoading: boolean;
}

export interface PodcastsActions {
    getPostsForPodcast: (podcast: string, pageNumber: number) => any;
    clearPosts: () => void;
    getPodcasts: () => any;
    setPostLoading: (loading: boolean) => void;
}

export type PodcastsPropsAndActions = PodcastsProps &
    PodcastsActions &
    RouteComponentProps;

export const mapStateToProps = (state: RootState): PodcastsProps => ({
    posts: state.postState.posts,
    podcasts: state.postState.podcasts,
    postsLoading: state.postState.loadingPosts,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): PodcastsActions => {
    return {
        getPostsForPodcast: async (podcast: string, pageNumber: number) => {
            return await dispatch(
                backendGetPostsByFilters(pageNumber, [podcast])
            );
        },
        clearPosts: () => dispatch(clearPosts()),
        getPodcasts: async () => {
            return await dispatch(backendGetPodcasts());
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};
