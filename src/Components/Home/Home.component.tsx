import React, {FC, useEffect} from "react";
import './Home.css'
import {Post, RootState} from "../../Posts.reducer";
import {addPost} from "../../Posts.action";
import {connect} from "react-redux";

interface HomeActions {
    addPost: (newPost: Post) => void
}

interface HomeProps {
    posts: Post[]
}

type HomePropsWithActions = HomeProps & HomeActions

const HomeComponent: FC<HomePropsWithActions> = props => {
    useEffect(() => {
        console.log('Home component props:', props.posts[0])
    }, []);

    return (
        <div className='container'>
            <div className='columns is-centered'>
                <div className='column is-narrow title-anim'>
                    <h1 className='title is-1 '>Lakota Learning</h1>
                    <h2 className='subtitle'>Lakota lessons and language tools from Andrea</h2>
                </div>
            </div>
            <div className='recent-posts-container'>
                <h3 className='title is-3'>Recent Posts:</h3>
                <div>{JSON.stringify(props.posts[0])}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState): HomeProps => ({
    posts: state.postState.posts
});

const mapDispatchToProps = {
    addPost: addPost
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
