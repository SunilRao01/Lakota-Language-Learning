import { RouterProps } from 'react-router';
import {
    backendCreatePost,
    IQuiz,
    Post,
} from '../../../redux/Posts/Posts.reducer';
import { RootState } from '../../../redux/store';
import { ThunkDispatch } from 'redux-thunk';

interface AdminPostCreateProps {
    jwt: string;
    updatePostLoading: boolean;
}

interface AdminPostCreateActions {
    createPost: (newPost: any, jwt: string) => void;
}

export type AdminPostCreateComponentPropsWithActions = AdminPostCreateActions &
    AdminPostCreateProps &
    RouterProps;

export interface PostCreatePayload {
    postTitle: string;
    postContent: string;
    tags: string[];
    categories: string[];
    quizzes: IQuiz[];
    podcastLink: string;
}

export const mapStateToProps = (state: RootState): AdminPostCreateProps => {
    return {
        jwt: state.adminState.jwt,
        updatePostLoading: state.postState.updatingPostLoading,
    };
};

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminPostCreateActions => {
    return {
        createPost: async (post: Post, jwt: string) => {
            await dispatch(backendCreatePost(post, jwt));
        },
    };
};
