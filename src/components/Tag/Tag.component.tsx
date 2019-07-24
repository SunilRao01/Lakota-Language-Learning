import React, {FC} from 'react'
import {Link} from 'react-router-dom'

interface TagProps {
    text: string
}

export const Tag: FC<TagProps> = props => {
    return (
        <p className='control'>
            <Link className="button is-info is-small" to={`/posts?tags=${props.text}`}>
                    {props.text}
            </Link>
        </p>

    )
}
