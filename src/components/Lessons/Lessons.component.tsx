import React, {FC, Fragment, useEffect} from 'react';
import {RootState} from '../../store'
import {backendGetLessons, backendGetPostsByLessons, Post} from '../../redux/Posts/Posts.reducer'
import {ThunkDispatch} from 'redux-thunk'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {PostCard} from '../PostCard/PostCard.component'
import {clearPosts, setPostLoading} from '../../redux/Posts/Posts.action'

export interface LessonsProps {
    posts: Post[],
    lessons: { id: number, lesson: string }[],
    postsLoading: boolean
}

export interface LessonsActions {
    getPostsForLessons: (lessons: string[]) => void;
    clearPosts: () => void;
    getLessons: () => any;
    setPostLoading: (loading: boolean) => void
}

export type LessonsPropsAndActions = LessonsProps & LessonsActions & RouteComponentProps;

export const mapStateToProps = (state: RootState): LessonsProps => ({
    posts: state.postState.posts,
    lessons: state.postState.lessons,
    postsLoading: state.postState.loadingPosts
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
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading))
    }
}

const LessonsComponent: FC<LessonsPropsAndActions> = props => {
    const { clearPosts, posts, getLessons, getPostsForLessons, lessons, postsLoading, setPostLoading } = props

    useEffect(() => {
       const fetchData = async () => {
           setPostLoading(true)
           const lessons: {id: number, lesson: string}[] = await getLessons()
           clearPosts()
           await getPostsForLessons(lessons.map((l: {id: number, lesson: string}) => l.lesson))
           setPostLoading(false)
       }

       fetchData()
    }, [clearPosts, getLessons, getPostsForLessons, setPostLoading])

    return (
        <div className='container'>
            <h1 className='title'>Lessons</h1>
            <hr/>
            {postsLoading && <progress className="progress is-small is-info" max="100">50%</progress>}
            {!postsLoading &&
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
