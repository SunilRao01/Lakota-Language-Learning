import React, {ChangeEvent, FC, useEffect} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../store'
import {
    backendAddLesson,
    backendDeleteLesson,
    backendGetCategories,
    backendGetLessons
} from '../../redux/Posts/Posts.reducer'
import {ThunkDispatch} from 'redux-thunk'

interface AdminLessonProps {
    lessons: {id: number, lesson: string}[],
    categories: string[],
    jwt: string
}

interface AdminLessonActions {
    getLessons: () => void;
    getCategories: () => void;
    addLesson: (lesson: string, jwt: string) => void;
    deleteLesson: (lessonId: number, jwt: string) => void;
}

const mapStateToProps = (state: RootState): AdminLessonProps => {
    return {
        lessons: state.postState.lessons,
        categories: state.postState.categories ? state.postState.categories : [],
        jwt: state.adminState.jwt
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): AdminLessonActions => {
    return {
        getLessons: async () => {
            await dispatch(backendGetLessons())
        },
        getCategories: async () => {
            await dispatch(backendGetCategories())
        },
        addLesson: async (lesson: string, jwt: string) => {
            await dispatch(backendAddLesson(lesson, jwt))
        },
        deleteLesson: async (lessonId: number, jwt: string) => {
            await dispatch(backendDeleteLesson(lessonId, jwt))
        }
    }
}

const AdminLessonsComponent: FC<AdminLessonProps & AdminLessonActions> = props => {
    useEffect(() => {
        const fetchData = async () => {
            if (!props.lessons || props.lessons.length === 0) {
                await props.getLessons()
            }

            if (!props.categories || props.categories.length === 0) {
                await props.getCategories()
            }
        }

        fetchData()
    }, [])

    return <div>
        <h3 className='title is-3'>Lessons:</h3>
        <div className='tags'>
            {props.lessons.map((l, i) => (
                <span key={i} className="tag is-info">
                    {l.lesson}
                    <button onClick={
                        async () => await props.deleteLesson(l.id, props.jwt)
                    } className="delete is-small"></button>
                  </span>
            ))}
        </div>


        <hr/>

        <div className="control">
            <div className="select">
                <select onChange={
                    async (event: ChangeEvent<HTMLSelectElement>) => {
                        if (event.target.value != 'Add a Lesson' && props.lessons.filter(l => l.lesson === event.target.value).length === 0) {
                            await props.addLesson(event.target.value, props.jwt)
                        }
                    }
                }>
                    <option>Add a Lesson</option>
                    {props.categories.map((c, index) => <option key={index}>{c}</option>)}
                </select>
            </div>
        </div>
    </div>
};

export const AdminLessons = connect(mapStateToProps, mapDispatchToProps)(AdminLessonsComponent)
