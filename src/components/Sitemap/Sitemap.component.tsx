import React, { createRef, FC, useCallback, useEffect, useState } from 'react';
import {
    mapDispatchToProps,
    mapStateToProps,
    SitemapPropsAndActions,
} from './Sitemap.types';
import { connect } from 'react-redux';
import { Viewer } from '@toast-ui/react-editor';
import styles from './Sitemap.module.scss'

export const Sitemap: FC<SitemapPropsAndActions> = (props) => {
    const { getSitemap, sitemap } = props;

    const viewerRef = createRef<any>();

    const [sitemapLoading, setSitemapLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setSitemapLoading(true);

        await getSitemap();

        setSitemapLoading(false);
    }, [getSitemap]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (sitemap && sitemap.content && viewerRef.current) {
            viewerRef.current.getInstance().setMarkdown(sitemap.content);
        }
    }, [sitemap, viewerRef]);

    return (
        <div className="container">
            {sitemapLoading && (
                <progress className="progress is-small is-info" max="100">
                    50%
                </progress>
            )}

            <>
                {sitemap && sitemap.title && <h1 className={`title ${styles.SitemapTitle}`}>{sitemap.title}</h1>}
                {!sitemapLoading && sitemap && <Viewer ref={viewerRef} />}
            </>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sitemap);
