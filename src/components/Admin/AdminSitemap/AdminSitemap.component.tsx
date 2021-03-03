import React, {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
    AdminSitemapComponentPropsWithActions,
    mapDispatchToProps,
    mapStateToProps,
} from './AdminSitemap.types';
import styles from '../AdminPostCreate/AdminPostCreate.module.scss';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Sitemap } from '../../../redux/Posts/Posts.reducer';

// TODO: Add typing for api payloads

const AdminSitemap: FC<AdminSitemapComponentPropsWithActions> = (props) => {
    const {
        updateSitemap,
        jwt,
        updateSitemapLoading,
        history,
        getSitemap,
        sitemap,
    } = props;

    const [updatedSitemap, setUpdatedSitemap] = useState<Sitemap>({
        title: '',
        content: '',
    });

    const editorRef = useRef<any>();
    const [showUpdateStatus, setShowUpdateStatus] = useState(false);

    const fetchData = useCallback(async () => {
        await getSitemap();
    }, [getSitemap]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (sitemap && sitemap.title) {
            setUpdatedSitemap({
                title: sitemap.title,
                content: sitemap.content,
            });

            if (editorRef.current) {
                editorRef.current.getInstance().setMarkdown(sitemap.content);
            }
        }
    }, [sitemap, history.location.pathname]);

    if (!jwt || jwt.length === 0) {
        return <Redirect to={'/admin/login'} />;
    }

    if (updatedSitemap && sitemap) {
        return (
            <div className="container">
                <div className="field">
                    <label className="label">Sitemap Title</label>
                    <div className="control">
                        {sitemap && (
                            <input
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setUpdatedSitemap({
                                        ...updatedSitemap,
                                        title: e.target.value,
                                    })
                                }
                                className="input"
                                type="text"
                                placeholder="Sitemap Title"
                                defaultValue={sitemap.title}
                            />
                        )}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Sitemap Content</label>
                    <div className="control">
                        {sitemap?.content && (
                            <Editor
                                previewStyle="vertical"
                                height="600px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                ref={editorRef}
                            />
                        )}
                    </div>
                </div>

                <hr />

                <button
                    onClick={async () => {
                        setShowUpdateStatus(false);

                        // TODO: Do basic form validation

                        const updateSitemapPayload = {
                            ...updatedSitemap,
                            content: editorRef.current
                                .getInstance()
                                .getMarkdown(),
                        };

                        await updateSitemap(updateSitemapPayload, jwt);
                        setShowUpdateStatus(true);
                    }}
                    className="button is-primary"
                >
                    Edit Post
                </button>

                {updateSitemapLoading && (
                    <div className="notification is-warning">
                        <button className="delete" />
                        Updating sitemap...
                    </div>
                )}

                {!updateSitemapLoading && showUpdateStatus && (
                    <div
                        className={`notification is-success ${styles.UpdateBanner}`}
                    >
                        <button className="delete" />
                        Sitemap updated successfully!
                    </div>
                )}
            </div>
        );
    } else {
        return <div>Getting updatedSitemap...</div>;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSitemap);
