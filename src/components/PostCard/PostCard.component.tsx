import React, {FC, useEffect} from 'react'
import {Post} from '../../redux/Posts/Posts.reducer'
import {Link} from 'react-router-dom'
import './PostCard.css'
import {Tag} from '../Tag/Tag.component'
import {Editor} from 'react-draft-wysiwyg'

interface PostCardProps {
    post: Post,
    onClickTag?: (e: any) => void,
    onClickCategory?: (e: string) => void,
    showTitleOnly?: boolean
}

export const PostCard: FC<PostCardProps> = props => {
    const clickFunction = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, t: string) => {
        e.preventDefault()

        props.onClickCategory && props.onClickCategory(t)
    }

    return (
        <div data-testid={props.showTitleOnly ? `postcard-small` : `postcard-large`}
             className='column swing-in-top-bck is-full'>
            <div className='card'>
                <header className='card-header'>
                    <Link to={`/post/${props.post.id}`}><p className='card-header-title'>{props.post.title}</p>
                    </Link>
                </header>
                {!props.showTitleOnly &&
                <div className='card-content'>
                    <div className='content'>
                        <div>{props.post.content &&
                        <Editor
                            readOnly={true}
                            toolbarHidden={true}
                            initialContentState={JSON.parse(props.post.content.toString())}
                        />
                        }</div>
                        <br/>
                        <div className='is-size-7'>{props.post.creationDate}</div>
                        <div className='has-text-weight-bold is-size-7'>Categories:</div>
                        {
                            props.post.categories.map((c: string, i: number) => {
                                return (<div key={i}>
                                    {props.onClickCategory
                                        ? <a className='is-size-7' onClick={e => clickFunction(e, c)}>{`${c}`}</a>
                                        : <Link className='is-size-7' to={`/posts?categories=${c}`}>{`${c}`}</Link>}
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
                }
            </div>
        </div>
    )
}
