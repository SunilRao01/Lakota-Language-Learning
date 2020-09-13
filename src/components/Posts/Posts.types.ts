import { backendGetPost, Post } from '../../redux/Posts/Posts.reducer';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { setCurrentPost, setPostLoading } from '../../redux/Posts/Posts.action';

interface PostsOwnProps {
    post: Post | undefined;
    posts: Post[];
    postsLoading: boolean;
}

interface PostActions {
    getPost: (postId: number) => void;
    setCurrentPost: (post: Post) => void;
    setPostLoading: (loading: boolean) => void;
}

export type PostsPropsAndActions = PostsOwnProps &
    RouteComponentProps<{ postId: string }> &
    PostActions;

export const mapStateToProps = (state: RootState): PostsOwnProps => ({
    post: state.postState.currentPost,
    posts: state.postState.posts,
    postsLoading: state.postState.loadingPosts,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): PostActions => {
    return {
        getPost: async (postId: number) => {
            return await dispatch(backendGetPost(postId));
        },
        setCurrentPost: (post: Post) => dispatch(setCurrentPost(post)),
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};
