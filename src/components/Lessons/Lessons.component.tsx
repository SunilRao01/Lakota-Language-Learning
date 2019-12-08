import React, {FC, Fragment, useEffect} from 'react';
import {RootState} from '../../store'
import {backendGetPostsByLessons, Post} from '../../redux/Posts/Posts.reducer'
import {ThunkDispatch} from 'redux-thunk'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {PostCard} from '../PostCard/PostCard.component'
import {clearPosts} from '../../redux/Posts/Posts.action'

export interface LessonsProps {
    posts: Post[],
    lessons: string[]
}

export interface LessonsActions {
    getPostsForLessons: () => void;
    clearPosts: () => void;
}

export type LessonsPropsAndActions = LessonsProps & LessonsActions & RouteComponentProps;

export const mapStateToProps = (state: RootState): LessonsProps => ({
    posts: state.postState.posts,
    lessons: state.postState.lessons
})

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): LessonsActions => {
    return {
        getPostsForLessons: async () => {
            await dispatch(backendGetPostsByLessons())
        },
        clearPosts: () => dispatch(clearPosts())
    }
}

const LessonsComponent: FC<LessonsPropsAndActions> = props => {
    useEffect(() => {
        props.clearPosts()
        props.getPostsForLessons()
    }, [])

    return (
        <div className='container'>
            <h1 className='title'>Lessons</h1>
            <hr/>
            {
                props.lessons.map((lesson, i) => (
                    <Fragment key={i}>
                        <h3 className='title is-4'>{lesson}</h3>
                        {props.posts.filter(p => p.categories.includes(lesson)).map((p, i) => (
                            <div key={i}>
                                <PostCard post={p}/>
                            </div>
                        ))}
                    </Fragment>
                ))
            }
        </div>
    )
};

export const Lessons = connect(mapStateToProps, mapDispatchToProps)(LessonsComponent);
