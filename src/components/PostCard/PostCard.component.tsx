import React, {FC, useEffect} from 'react'
import {Post} from '../../redux/Posts/Posts.reducer'
import './PostCard.css'

interface PostCardProps {
    post: Post
}

export const PostCard: FC<PostCardProps> = props => {
    useEffect(() => {
        console.log('Passed in post: ', props.post)
    }, [])

    return (
        <div className='column'>
            <div className='card post-card'>
                <header className='card-header'>
                    <p className='card-header-title'>{props.post.postTitle}</p>
                </header>
                <div className='card-content'>
                    <div className='content'>
                        <div>{props.post.postContent}</div>
                        <br/>
                        <div className='subtitle is-7'>{props.post.creationDate.toDateString()}</div>
                    </div>
                    <div className='tags'>
                        <span className="tag is-info">tag 1</span>
                        <span className="tag is-info">tag 2</span>
                        <span className="tag is-info">tag 3</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
