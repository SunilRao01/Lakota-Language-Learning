import React, {FC, useEffect} from 'react';
import './Home.css'
import {
    backendGetCategories,
    backendGetPosts,
    backendGetTags,
    backendGetWordOfTheDayPosts,
    Post
} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {RootState} from '../../store'
import {PostCard} from '../PostCard/PostCard.component'
import {Tag} from '../Tag/Tag.component'
import {Link} from 'react-router-dom'
import {ThunkDispatch} from 'redux-thunk'
import {setCurrentPage} from '../../redux/Filter/Filter.action'

interface HomeActions {
    getPosts: (pageNumber: number) => void
    getCategories: () => void
    getTags: () => void
    getWordOfTheDayPosts: () => void
    setCurrentPage: (pageNum: number) => void
}

interface HomeProps {
    posts: Post[],
    wordOfTheDayPosts: Post[],
    categories: string[],
    tags: string[],
    currentPage: number;
}

type HomePropsWithActions = HomeProps & HomeActions

export const mapStateToProps = (state: RootState): HomeProps => ({
    posts: state.postState.posts,
    wordOfTheDayPosts: state.postState.wordOfTheDayPosts ? state.postState.wordOfTheDayPosts : [],
    categories: state.postState.categories ? state.postState.categories : [],
    tags: state.postState.tags ? state.postState.tags : [],
    currentPage: state.filterState.currentPage
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
            await dispatch(backendGetWordOfTheDayPosts(1))
        },
        setCurrentPage: (pageNum: number) => dispatch(setCurrentPage(pageNum))
    }
};

const HomeComponent: FC<HomePropsWithActions> = props => {
    useEffect(() => {
        const fetchData = async () => {
            if (props.currentPage === 0) {
                props.setCurrentPage(1);

                await props.getPosts(1)
                await props.getCategories()
                await props.getTags()
                await props.getWordOfTheDayPosts()
            }
        }

        fetchData()
    }, []);

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
                    {/*<progress className="progress is-small is-info" max="100">60%</progress>*/}
                    {
                        props.posts.map((p: Post, i: number) =>
                            <div key={i}>
                                <PostCard showPreviewOnly={true} post={p}/>
                                {i < props.posts.length - 1 ? <hr/> : ``}
                            </div>)
                    }
                    <button className="button is-info pagination-button"
                            disabled={props.currentPage === 1}
                            onClick={() => {
                                if (props.currentPage > 1) {
                                    props.getPosts(props.currentPage-1)
                                    setCurrentPage(props.currentPage-1)
                                }
                            }}>
                        Previous Page
                    </button>
                    <button className="button is-info pagination-button"
                            disabled={props.posts.length === 0 || props.posts.length < 5}
                            onClick={() => {
                                if (props.posts.length !== 0) {
                                    props.getPosts(props.currentPage+1)
                                    setCurrentPage(props.currentPage+1)
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
                            props.wordOfTheDayPosts.map((p: Post, i: number) =>
                                <div key={i}>
                                    <PostCard post={p} showTitleOnly={true}/>
                                </div>
                            )
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
