import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface TagProps {
    text: string;
    onClick?: (e: string) => void;
}

export const Tag: FC<TagProps> = (props) => {
    const { onClick, text } = props;

    const clickFunction = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        t: string
    ) => {
        e.preventDefault();

        onClick && onClick(t);
    };

    return (
        <p className="swing-in-top-bck control">
            {onClick ? (
                <button
                    onClick={(e) => clickFunction(e, text)}
                    className="button is-info is-small"
                >
                    {text}
                </button>
            ) : (
                <Link
                    className="button is-info is-small"
                    to={`/posts?tag=${text}`}
                >
                    {text}
                </Link>
            )}
        </p>
    );
};
