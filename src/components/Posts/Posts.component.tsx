import React, {FC, useEffect} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../store'
import {backendGetPost, IQuiz, Post} from '../../redux/Posts/Posts.reducer'
import {Tag} from '../Tag/Tag.component'
import {RouteComponentProps} from 'react-router'
import {ThunkDispatch} from 'redux-thunk'
import Viewer from 'tui-editor/dist/tui-editor-Viewer'
import {QuizCard} from '../QuizCard/QuizCard.component'
import {Link} from 'react-router-dom'
import './Posts.css'

interface PostsOwnProps {
    post: Post | undefined
}

interface PostActions {
    getPost: (postId: number) => void
}

type PostsProps = PostsOwnProps & RouteComponentProps<{ postId: string }> & PostActions

export const PostsComponent: FC<PostsProps> = props => {
    useEffect(() => {
        const urlParams = props.history.location.pathname.split('/')
        const postId = parseInt(urlParams[urlParams.length - 1])

        props.getPost(postId)
    }, [])

    useEffect(() => {
        if (props.post && props.post.content) {
            new Viewer({
                el: document.querySelector('#post-content')!,
                initialValue: props.post.content
            })
        }
    }, [props.post])

    if (props.post) {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">{props.post.title}</h1>
                    <div className='content'>
                        {props.post.content &&
                        <div id='post-content'/>
                        }
                        <br/>
                        {props.post.podcastLink &&
                        props.post.podcastLink.length > 0 ?
                            <div dangerouslySetInnerHTML={{__html: props.post.podcastLink}}></div> : ``
                        }
                        <br/>
                        <hr/>
                        {
                            props.post.quizzes &&
                            props.post.quizzes.length > 0 &&
                            <div>
                                <h3>Quiz:</h3>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap'
                                }}>
                                {
                                    props.post.quizzes.map((q: IQuiz, i: number) => <QuizCard key={i} quiz={q}/>)
                                }
                                </div>
                            </div>
                        }

                        <br/>
                        <div className='has-text-weight-bold section-title'>Posted: </div><p className='is-size-8'>{new Date(props.post.creationDate).toString()}</p>
                        <div className='has-text-weight-bold section-title'>Categories:</div>
                        <p>
                            {
                                props.post.categories.map((c: string, i: number) =>
                                    <Link className='is-size-6' to={`/posts?category=${c}`}>
                                        {`${c}${i < props.post!.categories.length - 1 ? ', ' : ''}`}
                                    </Link>)
                            }
                        </p>
                        <div className='has-text-weight-bold section-title'>Tags:</div>
                        <div className='field is-grouped'>
                            {
                                props.post.tags.map((p: any, i: any) => <Tag key={i} text={p}/>)
                            }
                        </div>

                    </div>

                </div>
            </section>
        )
    } else {
        return <div>Getting post...</div>
    }
}

export const mapStateToProps = (state: RootState): PostsOwnProps => ({
    post: state.postState.currentPost
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): PostActions => {
    return {
        getPost: async (postId: number) => {
            return await dispatch(backendGetPost(postId))
        }
    }
};

export const Posts = connect(mapStateToProps, mapDispatchToProps)(PostsComponent)
