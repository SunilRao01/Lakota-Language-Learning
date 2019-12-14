import React, {FC, useEffect, useState} from 'react';
import './Home.css'
import {
    backendGetCategories,
    backendGetPosts,
    backendGetPostsByFilters,
    backendGetTags,
    Post
} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {RootState} from '../../store'
import {PostCard} from '../PostCard/PostCard.component'
import {Tag} from '../Tag/Tag.component'
import {Link} from 'react-router-dom'
import {ThunkDispatch} from 'redux-thunk'

interface HomeActions {
    getPosts: (pageNumber: number) => void
    getCategories: () => void
    getTags: () => void
    getWordOfTheDayPosts: () => void
}

interface HomeProps {
    posts: Post[],
    categories: string[],
    tags: string[]
}

type HomePropsWithActions = HomeProps & HomeActions

export const mapStateToProps = (state: RootState): HomeProps => ({
    posts: state.postState.posts,
    categories: state.postState.categories ? state.postState.categories : [],
    tags: state.postState.tags ? state.postState.tags : []
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): HomeActions => {
    return {
        getPosts: async (pageNumber: number) => {
            await dispatch(backendGetPosts(pageNumber))
        },
        getCategories: async () => {
            await dispatch(backendGetCategories())
        },
        getTags: async () => {
            await dispatch(backendGetTags())
        },
        getWordOfTheDayPosts: async () => {
            await dispatch(backendGetPostsByFilters(1, [], ['word of the day']))
        }
    }
};

const HomeComponent: FC<HomePropsWithActions> = props => {
    const [wordOfTheDayPosts, setWordOfTheDayPosts] = useState<Post[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        props.getPosts(currentPage)
        props.getCategories()
        props.getTags()
        props.getWordOfTheDayPosts()
    }, []);

    useEffect(() => {
        setWordOfTheDayPosts(props.posts.filter(p => p.tags.includes('word of the day')))
    }, [props.posts]);

    return (
        <div className='container'>
            <div className='columns is-centered'>
                <div className='column is-narrow title-anim'>
                    <p className='title is-2'>Lakota Language Learning</p>
                    <p className='subtitle is-4 swing-in-top-bck'>Lakota lessons and language tools from Hiŋskéhaŋska</p>
                </div>
            </div>
            <div className='columns is-variable is-4'>
                <div className='column is-two-thirds'>
                    <h3 className='title is-3'>Recent Posts:</h3>
                    {
                        props.posts.map((p: Post, i: number) =>
                            <div key={i}>
                                <PostCard post={p}/>
                                {i < props.posts.length - 1 ? <hr/> : ``}
                            </div>)
                    }
                    <button className="button is-info pagination-button"
                            disabled={currentPage === 1}
                            onClick={() => {
                                if (currentPage > 1) {
                                    props.getPosts(currentPage-1)
                                    setCurrentPage(currentPage-1)
                                }
                            }}>
                        Previous Page
                    </button>
                    <button className="button is-info pagination-button"
                            disabled={props.posts.length === 0}
                            onClick={() => {
                                if (props.posts.length !== 0) {
                                    props.getPosts(currentPage+1)
                                    setCurrentPage(currentPage+1)
                                }
                            }}>
                        Next Page
                    </button>
                    <br/>
                </div>
                <div className='column'>
                    <div className='word-of-the-day-section' data-testid='word-of-the-day'>
                        <h3 className='title is-3'>Word of the Day:</h3>
                        {
                            wordOfTheDayPosts.map((p: Post, i: number) =>
                                <div key={i}>
                                    <PostCard post={p} showTitleOnly={true}/>
                                </div>)
                        }
                    </div>

                    <div className='categories-section'>
                        <h3 className='title is-3'>Categories:</h3>
                        <div>
                            {
                                props.categories.length > 0 &&
                                Array.from(props.categories.values()).map((c: string, i: number) => {
                                    return <div className='swing-in-top-bck' key={i}>
                                        <Link to={`/posts?category=${c}`}>{`${c}`}</Link>
                                        {`${i < props.categories.length - 1 ? `,` : ``}`}&nbsp;
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    <div>
                        <h3 className='title is-3'>Tags:</h3>
                        <div className='field is-grouped tags-section'>
                            {props.tags.length > 0 &&
                            Array.from(props.tags).map((t: string, i: number) => {
                                return (<Tag key={i} text={t}/>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
