import React, {FC, useEffect, useState} from 'react';
import './Home.css'
import {backendGetPosts, Post} from '../../redux/Posts/Posts.reducer';
import {addPost} from '../../redux/Posts/Posts.action';
import {connect} from 'react-redux';
import {RootState} from '../../store'
import {PostCard} from '../PostCard/PostCard.component'
import {Tag} from '../Tag/Tag.component'
import {Link} from 'react-router-dom'
import {ThunkDispatch} from 'redux-thunk'

interface HomeActions {
    getPosts: (pageNumber: number) => void,
    addPost: (newPost: Post) => void
}

interface HomeProps {
    posts: Post[]
}

type HomePropsWithActions = HomeProps & HomeActions

const HomeComponent: FC<HomePropsWithActions> = props => {
    const [wordOfTheDayPosts, setWordOfTheDayPosts] = useState<Post[]>([])
    const [allCategories, setAllCategories] = useState<Set<string>>(new Set<string>())
    const [allTags, setAllTags] = useState<Set<string>>(new Set<string>())

    useEffect(() => {
        props.getPosts(1)


    }, []);
    useEffect(() => {
        setWordOfTheDayPosts(props.posts.filter(p => p.tags.includes('word of the day')))

        // Set categories and tags
        props.posts.forEach(p => {
            p.categories.forEach((c: string) => setAllCategories(allCategories.add(c)))
            p.tags.forEach((t: string) => setAllTags(allTags.add(t)))
        })

        console.log('Categories: ', allCategories)
        console.log('Tags: ', allTags)

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
                        props.posts.length > 0 && props.posts.map((p: Post, i: number) =>
                            <div key={i}>
                                <PostCard post={p}/>
                                {i < props.posts.length - 1 ? <hr/> : ``}
                            </div>)
                    }
                    <br/>
                </div>
                <div className='column'>
                    <div className='word-of-the-day-section'>
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
                                allCategories.size > 0 &&
                                    Array.from(allCategories.values()).map((c: string, i: number) => {
                                        return <div className='swing-in-top-bck' key={i}>
                                                <Link to={`/posts?categories=${c}`}>{`${c}`}</Link>
                                                {`${i < allCategories.size - 1 ? `, ` : ``}`}
                                            </div>
                                    })
                            }
                        </div>
                    </div>

                    <div>
                        <h3 className='title is-3'>Tags:</h3>
                        <div className='field is-grouped tags-section'>
                            {allTags.size > 0 &&
                            Array.from(allTags).map((t: string, i: number) => {
                                return (<Tag key={i} text={t}/>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const mapStateToProps = (state: RootState): HomeProps => ({
    posts: state.postState.posts
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): HomeActions => {
    return {
        getPosts: async (pageNumber: number) => {
            await dispatch(backendGetPosts(pageNumber))
            console.log('finished getting posts from backend')
        },
        addPost: (newPost: Post) => dispatch(addPost(newPost))
    }
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
