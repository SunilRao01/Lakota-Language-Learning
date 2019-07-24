import React, {FC} from 'react'
import {Post} from '../../redux/Posts/Posts.reducer'
import {Link} from 'react-router-dom'
import './PostCard.css'
import {Tag} from '../Tag/Tag.component'

interface PostCardProps {
    post: Post,
    onClickTag?: (e: any) => void,
    onClickCategory?: () => void
}

export const PostCard: FC<PostCardProps> = props => {
    return (
        <div className='column swing-in-top-bck is-full'>
            <div className='card'>
                <header className='card-header'>
                    <Link to={`/post/${props.post.id}`}><p className='card-header-title'>{props.post.postTitle}</p>
                    </Link>
                </header>
                <div className='card-content'>
                    <div className='content'>
                        <div>{props.post.postContent}</div>
                        <br/>
                        <div className='is-size-7'>{props.post.creationDate.toDateString()}</div>
                        <div className='has-text-weight-bold is-size-7'>Categories:</div>
                            {
                                Array.from(props.post.categories).map((c: string, i: number) => {
                                    return (<div key={i}>
                                        <Link className='is-size-7' to={`/posts?categories=${c}`}>{`${c}`}</Link>
                                        {`${i < props.post.categories.length - 1 ? `, ` : ``}`}
                                    </div>)
                                })
                            }
                    </div>

                    <div className='tags'>
                        {
                            props.post.tags.map((p: string, i: number) =>
                                <Tag key={i} text={p} onClick={props.onClickTag}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
