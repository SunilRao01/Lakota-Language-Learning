import React, { createRef, FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.scss';
import { Tag } from 'components/Tag/Tag.component';
import { PostCardProps } from './PostCard.types';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

export const PostCard: FC<PostCardProps> = (props) => {
    const {
        post,
        onClickCategory,
        onClickTag,
        showPreviewOnly,
        showTitleOnly,
    } = props;

    const viewerRef = createRef<any>();

    const clickFunction = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        t: string
    ) => {
        e.preventDefault();

        onClickCategory && onClickCategory(t);
    };

    useEffect(() => {
        if (post && post.content && viewerRef.current) {
            viewerRef.current.getInstance().setMarkdown(post.content);
        }
    }, [post, viewerRef]);

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
                        <div className={`content `}>
                            <div
                                className={`${
                                    showPreviewOnly === true
                                        ? styles.PreviewMode
                                        : ''
                                }`}
                            >
                                {post.content && <Viewer ref={viewerRef} />}
                            </div>
                            <br />
                            <div className="is-size-7">
                                <b>Posted: </b>
                                {new Date(post.creationDate).toString()}
                            </div>
                            {post.categories && post.categories.length > 0 && (
                                <>
                                    <b className="is-size-7">Categories: </b>
                                    {post.categories.map(
                                        (c: string, i: number) => {
                                            return (
                                                <div
                                                    className={
                                                        styles.Categories
                                                    }
                                                    key={i}
                                                >
                                                    {onClickCategory ? (
                                                        <button
                                                            className={`is-size-7 ${styles.Category}`}
                                                            onClick={(e) =>
                                                                clickFunction(
                                                                    e,
                                                                    c
                                                                )
                                                            }
                                                        >{`${c}`}</button>
                                                    ) : (
                                                        <Link
                                                            className="is-size-7"
                                                            to={`/posts?category=${c}`}
                                                        >{`${c}`}</Link>
                                                    )}
                                                    {`${
                                                        i <
                                                        post.categories.length -
                                                            1
                                                            ? `, `
                                                            : ``
                                                    }`}
                                                </div>
                                            );
                                        }
                                    )}
                                </>
                            )}
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
