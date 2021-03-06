import {
    backendDeletePost,
    apiGetPosts,
    Post,
} from '../../../redux/Posts/Posts.reducer';
import { RootState } from '../../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router';

interface AdminHomeActions {
    getPosts: (pageNum: number) => void;
    deletePost: (postId: number, jwt: string) => void;
}

interface AdminHomeProps {
    posts: Post[];
    jwt: string;
}

export type AdminHomePropsWithActions = AdminHomeProps &
    AdminHomeActions &
    RouteComponentProps;

export const mapStateToProps = (state: RootState): AdminHomeProps => ({
    posts: state.postState.posts,
    jwt: state.adminState.jwt,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminHomeActions => {
    return {
        getPosts: async (pageNumber: number) => {
            await dispatch(apiGetPosts(pageNumber));
        },
        deletePost: async (postId: number, jwt: string) => {
            await dispatch(backendDeletePost(postId, jwt));
        },
    };
};
