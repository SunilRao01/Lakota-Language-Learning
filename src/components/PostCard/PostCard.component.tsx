import React, {FC, useEffect} from 'react'
import {Post} from '../../redux/Posts/Posts.reducer'
import { Link } from 'react-router-dom'
import './PostCard.css'

interface PostCardProps {
    post: Post
}

export const PostCard: FC<PostCardProps> = props => {
    useEffect(() => {
        console.log('Passed in post: ', props.post)
    }, [])

    return (
        <div className='column swing-in-top-bck is-full'>
            <div className='card'>
                <header className='card-header'>
                    <Link to={`/posts/${props.post.id}`}><p className='card-header-title'>{props.post.postTitle}</p></Link>
                </header>
                <div className='card-content'>
                    <div className='content'>
                        <div>{props.post.postContent}</div>
                        <br/>
                        <div className='is-size-7'>{props.post.creationDate.toDateString()}</div>
                        <div className='has-text-weight-bold is-size-7'>Categories:</div>
                        <p className='is-size-7'>
                            {
                                props.post.categories.map((c: string, i: number) => `${c}${i < props.post.categories.length - 1 ? ', ' : ''}`)
                            }
                        </p>
                    </div>

                    <div className='tags'>
                        {
                            props.post.tags.map(p => <p className='control'>
                                <a className="button is-info is-small">{p}</a></p>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
