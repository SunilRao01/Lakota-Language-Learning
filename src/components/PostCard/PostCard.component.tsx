import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.scss';
import { Tag } from 'components/Tag/Tag.component';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import 'tui-editor/dist/tui-editor-contents.css';
import { PostCardProps } from './PostCard.types';

export const PostCard: FC<PostCardProps> = (props) => {
    const {
        post,
        onClickCategory,
        onClickTag,
        showPreviewOnly,
        showTitleOnly,
    } = props;

    // generates hash for tui editor render target div (needs to be a unique id)
    const [viewHash] = useState(Math.random().toString(4).substring(2, 15));

    const clickFunction = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        t: string
    ) => {
        e.preventDefault();

        onClickCategory && onClickCategory(t);
    };

    useEffect(() => {
        if (!showTitleOnly && post.content) {
            new Viewer({
                el: document.querySelector(
                    `#post-content-${post.id}-${viewHash}`
                )!,
                initialValue: post.content,
            });
        }
    }, [post.content, post.id, showTitleOnly, viewHash]);

    return (
        <div
            data-testid={showTitleOnly ? 'postcard-small' : 'postcard-large'}
            className="column is-full"
        >
            <div className="card">
                <header className="card-header">
                    <Link to={`/post/${post.id}`}>
                        <p className="card-header-title">{post.title}</p>
                    </Link>
                </header>
                {!showTitleOnly && (
                    <div className="card-content">
                        <div className="content">
                            {post.content && (
                                <div
                                    className={`${
                                        showPreviewOnly === true
                                            ? styles.PreviewMode
                                            : ''
                                    }`}
                                    id={`post-content-${post.id}-${viewHash}`}
                                />
                            )}
                            <br />
                            <div className="is-size-7">
                                <b>Posted: </b>
                                {new Date(post.creationDate).toString()}
                            </div>
                            <b className="is-size-7">Categories: </b>
                            {post.categories.map((c: string, i: number) => {
                                return (
                                    <div className={styles.Categories} key={i}>
                                        {onClickCategory ? (
                                            <button
                                                className={`is-size-7 ${styles.Category}`}
                                                onClick={(e) =>
                                                    clickFunction(e, c)
                                                }
                                            >{`${c}`}</button>
                                        ) : (
                                            <Link
                                                className="is-size-7"
                                                to={`/posts?category=${c}`}
                                            >{`${c}`}</Link>
                                        )}
                                        {`${
                                            i < post.categories.length - 1
                                                ? `, `
                                                : ``
                                        }`}
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.Tags}>
                            {post.tags.map((p: string, i: number) => (
                                <Tag key={i} text={p} onClick={onClickTag} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
