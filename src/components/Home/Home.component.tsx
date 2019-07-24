import React, {FC, useEffect} from 'react';
import './Home.css'
import {Post} from '../../redux/Posts/Posts.reducer';
import {addPost, getPosts} from '../../redux/Posts/Posts.action';
import {connect} from 'react-redux';
import {AnyAction, Dispatch} from 'redux'
import {RootState} from '../../store'
import {PostCard} from '../PostCard/PostCard.component'
import {Tag} from '../Tag/Tag.component'
import {Link} from 'react-router-dom'

interface HomeActions {
    getPosts: () => void,
    addPost: (newPost: Post) => void
}

interface HomeProps {
    posts: Post[],
    tags: Set<string>,
    categories: Set<string>
}

type HomePropsWithActions = HomeProps & HomeActions

const HomeComponent: FC<HomePropsWithActions> = props => {
    useEffect(() => {
        props.getPosts()
    }, []);

    return (
        <div className='container'>

            <div className='columns is-centered'>
                <div className='column is-narrow title-anim'>
                    <p className='title is-2'>Lakota Learning</p>
                    <p className='subtitle is-4'>Lakota lessons and language tools from Hiŋskéhaŋska</p>
                </div>
            </div>
            <div className='columns'>
                <div className='column is-two-thirds'>
                    <h3 className='title is-3'>Recent Posts:</h3>
                    {
                        props.posts.map((p: Post, i: number) =>
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
                        <ul>
                            <li>Word 1</li>
                            <li>Word 2</li>
                            <li>Word 3</li>
                        </ul>
                    </div>

                    <div className='categories-section'>
                        <h3 className='title is-3'>Categories:</h3>
                        {
                            Array.from(props.categories).map((c: string, i: number) => {
                                return (<div key={i}>
                                    <Link to={`/posts?categories=${c}`}>{`${c}`}</Link>
                                    {`${i < props.categories.size - 1 ? `, ` : ``}`}
                                </div>)
                            })
                        }
                    </div>

                    <div className='tags-section'>
                        <h3 className='title is-3'>Tags:</h3>
                        <div className='field is-grouped'>
                            {props.tags &&
                            Array.from(props.tags).map((t: string, i: number) =>
                                <Tag key={i} text={t}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const mapStateToProps = (state: RootState): HomeProps => ({
    posts: state.postState.posts,
    tags: state.postState.tags,
    categories: state.postState.categories
});

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        getPosts: () => dispatch(getPosts()),
        addPost: (newPost: Post) => dispatch(addPost(newPost))
    }
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
