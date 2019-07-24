import React, {FC} from 'react'
import {Link} from 'react-router-dom'

interface TagProps {
    text: string,
    onClick?: (e: string) => void
}

export const Tag: FC<TagProps> = props => {
    const clickFunction = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, t: string) => {
        e.preventDefault()

        props.onClick && props.onClick(t)
    }

    return (
        <p className='control'>
            {props.onClick
                ? <a onClick={e => clickFunction(e, props.text)} className="button is-info is-small">
                    {props.text}
                </a>
                : <Link className="button is-info is-small" to={`/posts?tags=${props.text}`}>
                    {props.text}
                </Link>
            }

        </p>

    )
}
