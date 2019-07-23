import React, {FC} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../store'
import {Post} from '../../redux/Posts/Posts.reducer'
import {AnyAction, Dispatch} from 'redux'
import {Quiz} from '../Quiz/Quiz.component'
import {Tag} from '../Tag/Tag.component'

interface PostsOwnProps {
    match: any
}

interface PostReduxProps {
    post: Post
}

type PostsProps = PostsOwnProps & PostReduxProps

export const PostsComponent: FC<PostsProps> = props => {
    return (
        <section className="section">
            <div className="container">
                <h1 className="title">{props.post.postTitle}</h1>
                <div className='content'>
                    <p>
                        {props.post.postContent}
                    </p>
                    <br/>
                    <h3>Quiz:</h3>
                    {
                        props.post.quizzes &&
                        <Quiz
                            question={props.post.quizzes.questions[0].question}
                            answers={props.post.quizzes.questions[0].answers}
                            answer={props.post.quizzes.questions[0].answer}
                        />
                    }

                    <br/>
                    <p>{props.post.creationDate.toDateString()}</p>
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

export const mapStateToProps = (state: RootState, postsProps: PostsProps): PostReduxProps => ({
    post: state.postState.posts[postsProps.match.params.postId]
});

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        // getPosts: () => dispatch(getPosts()),
        // addPost: (newPost: Post) => dispatch(addPost(newPost))
    }
};

export const Posts = connect(mapStateToProps, mapDispatchToProps)(PostsComponent)
