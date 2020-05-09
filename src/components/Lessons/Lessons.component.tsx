import React, {FC, Fragment, useEffect} from 'react';
import {RootState} from '../../store'
import {backendGetLessons, backendGetPostsByLessons, Post} from '../../redux/Posts/Posts.reducer'
import {ThunkDispatch} from 'redux-thunk'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {PostCard} from '../PostCard/PostCard.component'
import {clearPosts} from '../../redux/Posts/Posts.action'

export interface LessonsProps {
    posts: Post[],
    lessons: { id: number, lesson: string }[]
}

export interface LessonsActions {
    getPostsForLessons: (lessons: string[]) => void;
    clearPosts: () => void;
    getLessons: () => any;
}

export type LessonsPropsAndActions = LessonsProps & LessonsActions & RouteComponentProps;

export const mapStateToProps = (state: RootState): LessonsProps => ({
    posts: state.postState.posts,
    lessons: state.postState.lessons
})

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): LessonsActions => {
    return {
        getPostsForLessons: async (lessons: string[]) => {
            let output = [];
            for (const l of lessons) {
                output.push(await dispatch(backendGetPostsByLessons([l])))
            }
            return output;
        },
        clearPosts: () => dispatch(clearPosts()),
        getLessons: async () => {
            return await dispatch(backendGetLessons())
        }

    }
}

const LessonsComponent: FC<LessonsPropsAndActions> = props => {
    const { clearPosts, posts, getLessons, getPostsForLessons, lessons } = props;

    useEffect(() => {
       const fetchData = async () => {
           const lessons: {id: number, lesson: string}[] = await getLessons()
           clearPosts()
           await getPostsForLessons(lessons.map((l: {id: number, lesson: string}) => l.lesson))
       }

       fetchData()
    }, [clearPosts, getLessons, getPostsForLessons])

    return (
        <div className='container'>
            <h1 className='title'>Lessons</h1>
            <hr/>
            {
                lessons.map((lesson, i) => (
                    <Fragment key={i}>
                        <h3 className='title is-4'>{lesson.lesson}</h3>
                        {posts.filter(p => p.categories.includes(lesson.lesson)).map((p, i) => (
                            <div key={i}>
                                <PostCard post={p} showPreviewOnly/>
                            </div>
                        ))}
                        {i !== lessons.length-1 && <hr/>}
                    </Fragment>
                ))
            }
        </div>
    )
};

export const Lessons = connect(mapStateToProps, mapDispatchToProps)(LessonsComponent);
