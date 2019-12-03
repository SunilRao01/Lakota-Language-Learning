import React, {FC, useEffect} from 'react'
import {Post} from '../../redux/Posts/Posts.reducer'
import {Link} from 'react-router-dom'
import './PostCard.css'
import {Tag} from '../Tag/Tag.component'
import Viewer from 'tui-editor/dist/tui-editor-Viewer'
import 'tui-editor/dist/tui-editor-contents.css'

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

    useEffect(() => {
        if (!props.showTitleOnly) {
            new Viewer({
                el: document.querySelector(`#post-content-${props.post.id}`)!,
                initialValue: props.post.content
            })
        }
    }, [])

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
                        {props.post.content &&
                        <div id={`post-content-${props.post.id}`}/>
                        }
                        <br/>
                        <div className='is-size-7'>
                            <b>Posted: </b>{new Date(props.post.creationDate).toString()}
                        </div>
                        <b className='is-size-7'>Categories: </b>
                        {
                            props.post.categories.map((c: string, i: number) => {
                                return (<div className='categories' key={i}>

                                    {props.onClickCategory
                                        ? <a className='is-size-7' onClick={e => clickFunction(e, c)}>{`${c}`}</a>
                                        : <Link className='is-size-7' to={`/posts?category=${c}`}>{`${c}`}</Link>}
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
