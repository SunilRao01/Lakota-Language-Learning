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
import {setCurrentPost} from '../../redux/Posts/Posts.action'

interface PostsOwnProps {
    post: Post | undefined,
    posts: Post[]
}

interface PostActions {
    getPost: (postId: number) => void,
    setCurrentPost: (post: Post) => void;
}

type PostsProps = PostsOwnProps & RouteComponentProps<{ postId: string }> & PostActions

export const PostsComponent: FC<PostsProps> = props => {
    const { posts, getPost, setCurrentPost, post, history } = props;

    useEffect(() => {
        const urlParams = history.location.pathname.split('/')
        const postId = parseInt(urlParams[urlParams.length - 1])

        const fetchData = async () => {
            await getPost(postId)
        }

        const targetPost = posts.filter(p => p.id === postId);
        if (targetPost.length > 0) {
            setCurrentPost(targetPost[0]);
        } else {
            fetchData();
        }
    }, [posts, history.location.pathname, props, getPost, setCurrentPost])

    useEffect(() => {
        if (post && post.content) {
            new Viewer({
                el: document.querySelector('#post-content')!,
                initialValue: post.content
            })
        }
    }, [post])

    if (post) {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">{post.title}</h1>
                    <div className='content'>
                        {post.content &&
                        <div id='post-content'/>
                        }
                        <br/>
                        {/*TODO: Temporarily disable podcast link; source unfinalized*/}
                        {/*{post.podcastLink &&*/}
                        {/*post.podcastLink.length > 0 ?*/}
                        {/*    <div dangerouslySetInnerHTML={{__html: post.podcastLink}}/> : ``*/}
                        {/*}*/}
                        {/*<br/>*/}
                        <hr/>
                        {
                            post.quizzes &&
                            post.quizzes.length > 0 &&
                            <div>
                                <h3>Quiz:</h3>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap'
                                }}>
                                {
                                    post.quizzes.map((q: IQuiz, i: number) => <QuizCard key={i} quiz={q}/>)
                                }
                                </div>
                            </div>
                        }

                        <br/>
                        <div className='has-text-weight-bold section-title'>Posted: </div><p className='is-size-8'>{new Date(post.creationDate).toString()}</p>
                        <div className='has-text-weight-bold section-title'>Categories:</div>
                        <p>
                            {
                                post.categories.map((c: string, i: number) =>
                                    <Link key={i} className='is-size-6' to={`/posts?category=${c}`}>
                                        {`${c}${i < post!.categories.length - 1 ? ', ' : ''}`}
                                    </Link>)
                            }
                        </p>
                        <div className='has-text-weight-bold section-title'>Tags:</div>
                        <div className='field is-grouped'>
                            {
                                post.tags.map((p: any, i: any) => <Tag key={i} text={p}/>)
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
    post: state.postState.currentPost,
    posts: state.postState.posts
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): PostActions => {
    return {
        getPost: async (postId: number) => {
            return await dispatch(backendGetPost(postId))
        },
        setCurrentPost: (post: Post) => dispatch(setCurrentPost(post))
    }
};

export const Posts = connect(mapStateToProps, mapDispatchToProps)(PostsComponent)
