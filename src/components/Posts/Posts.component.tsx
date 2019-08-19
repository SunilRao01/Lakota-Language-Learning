import React, {FC} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../store'
import {Post} from '../../redux/Posts/Posts.reducer'
import {Quiz} from '../Quiz/Quiz.component'
import {Tag} from '../Tag/Tag.component'
import {RouteComponentProps} from 'react-router'

interface PostsOwnProps {
    post: Post
}

type PostsProps = PostsOwnProps & RouteComponentProps<{postId: string}>

export const PostsComponent: FC<PostsProps> = props => {
    return (
        <section className="section">
            <div className="container">
                <h1 className="title">{props.post.title}</h1>
                <div className='content'>
                    <p>
                        {props.post.content}
                    </p>
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
                            props.post.tags.map((p, i) => <Tag key={i} text={p}/>)
                        }
                    </div>

                </div>

            </div>
        </section>
    )
}

export const mapStateToProps = (state: RootState, postsProps: PostsProps): PostsOwnProps => ({
    post: state.postState.posts[Number.parseInt(postsProps.match.params.postId)]
});

export const Posts = connect(mapStateToProps)(PostsComponent)
