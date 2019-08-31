import React, {FC, useEffect} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../store'
import {backendGetPost, backendUpdatePost, Post, PostPayload} from '../../redux/Posts/Posts.reducer'
import {Quiz} from '../Quiz/Quiz.component'
import {Tag} from '../Tag/Tag.component'
import {RouteComponentProps} from 'react-router'
import {ThunkDispatch} from 'redux-thunk'
import {Editor} from 'react-draft-wysiwyg'

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

        console.log('getting post with id: ', postId)
        props.getPost(postId)
    }, [])



    if (props.post) {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">{props.post.title}</h1>
                    <div className='content'>
                        {props.post.content &&
                        <Editor
                            readOnly={true}
                            toolbarHidden={true}
                            contentState={props.post.content}
                        />}
                        <br/>
                        <iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay"
                                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/255945886&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                        <br/>
                        <h3>Quiz:</h3>
                        {
                            props.post.quizzes &&
                            <Quiz
                                question={props.post.quizzes[0].question}
                                answers={props.post.quizzes[0].possibleAnswers}
                                answer={props.post.quizzes[0].answer}
                            />
                        }

                        <br/>
                        <p>{props.post.creationDate}</p>
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

export const mapStateToProps = (state: RootState, postsProps: PostsProps): PostsOwnProps => ({
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
