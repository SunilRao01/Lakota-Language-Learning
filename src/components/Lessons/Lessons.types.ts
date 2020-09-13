import {backendGetLessons, backendGetPostsByLessons, Post} from "../../redux/Posts/Posts.reducer";
import {RouteComponentProps} from "react-router";
import {RootState} from "../../redux/store";
import {ThunkDispatch} from "redux-thunk";
import {clearPosts, setPostLoading} from "../../redux/Posts/Posts.action";

export interface LessonsProps {
    posts: Post[];
    lessons: { id: number; lesson: string }[];
    postsLoading: boolean;
}

export interface LessonsActions {
    getPostsForLessons: (lessons: string[]) => void;
    clearPosts: () => void;
    getLessons: () => any;
    setPostLoading: (loading: boolean) => void;
}

export type LessonsPropsAndActions = LessonsProps &
    LessonsActions &
    RouteComponentProps;

export const mapStateToProps = (state: RootState): LessonsProps => ({
    posts: state.postState.posts,
    lessons: state.postState.lessons,
    postsLoading: state.postState.loadingPosts,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): LessonsActions => {
    return {
        getPostsForLessons: async (lessons: string[]) => {
            let output = [];
            for (const l of lessons) {
                output.push(await dispatch(backendGetPostsByLessons([l])));
            }
            return output;
        },
        clearPosts: () => dispatch(clearPosts()),
        getLessons: async () => {
            return await dispatch(backendGetLessons());
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};