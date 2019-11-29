import React, {FC, Fragment, useEffect} from 'react';
import {RootState} from '../../store'
import {backendGetPostsByCategory, Lesson} from '../../redux/Posts/Posts.reducer'
import {ThunkDispatch} from 'redux-thunk'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {PostCard} from '../PostCard/PostCard.component'

export interface LessonsProps {
    lessons: Lesson[]
}

export interface LessonsActions {
    getPostsByCategory: (categoryName: string) => void;
}

export type LessonsPropsAndActions = LessonsProps & LessonsActions & RouteComponentProps;

export const mapStateToProps = (state: RootState): LessonsProps => ({
    lessons: state.postState.lessons
})

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): LessonsActions => {
    return {
        getPostsByCategory: async (category: string) => {
            await dispatch(backendGetPostsByCategory(category))
        }
    }
}

const LessonsComponent: FC<LessonsPropsAndActions> = props => {
    useEffect(() => {
        props.getPostsByCategory('cat1')
    }, [])

    return (
        <div className='container'>
            <h1 className='title'>Lessons</h1>
            <hr/>
            {
                props.lessons.map((lesson, i) => (
                    <Fragment key={i}>
                        <h3 className='title is-4'>{lesson.name}</h3>
                        {lesson.posts.map((p, i) => (
                            <div key={i}>
                                <PostCard post={p} />
                            </div>
                        ))}
                    </Fragment>
                ))
            }
        </div>
    )
};

export const Lessons = connect(mapStateToProps, mapDispatchToProps)(LessonsComponent);
