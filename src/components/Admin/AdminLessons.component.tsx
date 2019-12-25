import React, {FC, useEffect} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../store'
import {backendGetLessons} from '../../redux/Posts/Posts.reducer'
import {ThunkDispatch} from 'redux-thunk'

interface AdminLessonProps {
    lessons: string[]
}

interface AdminLessonActions {
    getLessons: () => void;
}

const mapStateToProps = (state: RootState): AdminLessonProps => {
    return {
        lessons: state.postState.lessons
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): AdminLessonActions => {
    return {
        getLessons: async () => {
            await dispatch(backendGetLessons())
        }
    }
}

const AdminLessonsComponent: FC<AdminLessonProps & AdminLessonActions> = props => {
    useEffect(() => {
        props.getLessons()
    }, [])

    return <div>
        AdminLessons.component.tsx Component
    </div>
};

export const AdminLessons = connect(mapStateToProps, mapDispatchToProps)(AdminLessonsComponent)
