import { RouterProps } from 'react-router';
import {
    backendGetPost,
    backendUpdatePost,
    IQuiz,
    Post,
} from '../../../redux/Posts/Posts.reducer';
import { RootState } from '../../../redux/store';
import { ThunkDispatch } from 'redux-thunk';

interface AdminPostEditProps {
    jwt: string;
    updatePostLoading: boolean;
    currentPost?: any;
}

interface AdminPostEditActions {
    updatePost: (postId: number, updatedPost: any, jwt: string) => void;
    getPost: (postId: number) => void;
}

export type AdminPostEditComponentPropsWithActions = AdminPostEditActions &
    AdminPostEditProps &
    RouterProps;

export interface PostUpdatePayload {
    id: number;
    postTitle: string;
    postContent: string;
    tags: string[];
    categories: string[];
    quizzes: IQuiz[];
    podcastLink: string;
}

export const mapStateToProps = (state: RootState): AdminPostEditProps => {
    let newProps: AdminPostEditProps = {
        jwt: state.adminState.jwt,
        updatePostLoading: state.postState.updatingPostLoading,
    };
    if (state.postState.currentPost) {
        newProps.currentPost = state.postState.currentPost;
    }
    return newProps;
};

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminPostEditActions => {
    return {
        updatePost: async (postId: number, post: Post, jwt: string) => {
            await dispatch(backendUpdatePost(postId, post, jwt));
        },
        getPost: async (postId: number) => {
            return await dispatch(backendGetPost(postId));
        },
    };
};
