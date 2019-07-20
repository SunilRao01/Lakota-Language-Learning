import React, {FC, useEffect} from 'react';
import './Home.css'
import {Post} from '../../redux/Posts/Posts.reducer';
import {addPost, getPosts} from '../../redux/Posts/Posts.action';
import {connect} from 'react-redux';
import {AnyAction, Dispatch} from 'redux'
import {RootState} from '../../store'
import {PostCard} from '../PostCard/PostCard.component'

interface HomeActions {
    getPosts: () => void,
    addPost: (newPost: Post) => void
}

interface HomeProps {
    posts: Post[]
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
                    <div className='columns'>
                        {
                            props.posts.map(p => <PostCard post={p}/>)
                        }
                    </div>
                    <br/>
                    <h3 className='title is-4'>Character Test</h3>
                    <h3 className='subtitle is-6'>abčdeŋȟhiȟklmnopǧšstuvwžyz</h3>
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
                        <p><a href='/'>Blah</a>, <a href='/'>Blah</a>, <a href='/'>Blah</a>, <a href='/'>Blah</a></p>
                    </div>

                    <div className='tags-section'>
                        <h3 className='title is-3'>Tags:</h3>
                        <div className='field is-grouped'>
                            <p className='control'><a className="button is-info is-small">Tag 1</a></p>
                            <p className='control'><a className="button is-info is-small">Tag 2</a></p>
                            <p className='control'><a className="button is-info is-small">Tag 3</a></p>
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

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        getPosts: () => dispatch(getPosts()),
        addPost: (newPost: Post) => dispatch(addPost(newPost))
    }
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
