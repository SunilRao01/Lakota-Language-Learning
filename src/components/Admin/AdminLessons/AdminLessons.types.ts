import {RootState} from "../../../redux/store";
import {ThunkDispatch} from "redux-thunk";
import {
    backendAddLesson,
    backendDeleteLesson,
    backendGetCategories,
    apiGetLessons
} from "../../../redux/Posts/Posts.reducer";
import {setPostLoading} from "../../../redux/Posts/Posts.action";

interface AdminLessonProps {
    lessons: { id: number; lesson: string }[];
    categories: string[];
    jwt: string;
    postsLoading: boolean;
}

interface AdminLessonActions {
    getLessons: () => void;
    getCategories: () => void;
    addLesson: (lesson: string, jwt: string) => void;
    deleteLesson: (lessonId: number, jwt: string) => void;
    setPostLoading: (loading: boolean) => void;
}

export type AdminLessonsPropsAndActions = AdminLessonProps & AdminLessonActions;

export const mapStateToProps = (state: RootState): AdminLessonProps => {
    return {
        lessons: state.postState.lessons,
        categories: state.postState.categories
            ? state.postState.categories
            : [],
        jwt: state.adminState.jwt,
        postsLoading: state.postState.loadingPosts,
    };
};

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminLessonActions => {
    return {
        getLessons: async () => {
            await dispatch(apiGetLessons());
        },
        getCategories: async () => {
            await dispatch(backendGetCategories());
        },
        addLesson: async (lesson: string, jwt: string) => {
            await dispatch(backendAddLesson(lesson, jwt));
        },
        deleteLesson: async (lessonId: number, jwt: string) => {
            await dispatch(backendDeleteLesson(lessonId, jwt));
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};