import {
    backendGetLessons,
    backendGetPostsByFilters,
    Post
} from "../../redux/Posts/Posts.reducer";
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
    getPostsForLesson: (lesson: string, pageNumber: number) => any;
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
        getPostsForLesson: async (lesson: string, pageNumber: number) => {
            return await dispatch(backendGetPostsByFilters(
                pageNumber,
                [lesson]
            ));
        },
        clearPosts: () => dispatch(clearPosts()),
        getLessons: async () => {
            return await dispatch(backendGetLessons());
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};