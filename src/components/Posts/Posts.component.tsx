import React, {FC, useEffect} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../store'
import {backendGetPost, IQuiz} from '../../redux/Posts/Posts.reducer'
import {Tag} from '../Tag/Tag.component'
import {RouteComponentProps} from 'react-router'
import {ThunkDispatch} from 'redux-thunk'
import Viewer from 'tui-editor/dist/tui-editor-Viewer'
import {QuizCard} from '../QuizCard/QuizCard.component'

interface PostsOwnProps {
    post: any
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
                        {props.post.podcastLink.length > 0 ? <div dangerouslySetInnerHTML={{__html: props.post.podcastLink}}></div> : ``}
                        <br/>
                        <h3>Quiz:</h3>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}>
                            {
                                props.post.quizzes &&
                                props.post.quizzes.map((q: IQuiz, i: number) => <QuizCard key={i} quiz={q}/>)
                            }
                        </div>
                        <br/>
                        <p>{new Date(props.post.creationDate).toString()}</p>
                        <div className='has-text-weight-bold'>Categories:</div>
                        <p>
                            {
                                props.post.categories.map((c: string, i: number) => `${c}${i < props.post.categories.length - 1 ? ', ' : ''}`)
                            }
                        </p>
                        <div className='has-text-weight-bold tags control'>Tags:</div>
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
