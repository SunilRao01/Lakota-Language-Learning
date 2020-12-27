import React, { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import {AdminPodcastsPropsAndActions, mapDispatchToProps, mapStateToProps} from './AdminPodcasts.types';

const AdminPodcasts: FC<AdminPodcastsPropsAndActions> = (props) => {
    const {
        jwt,
        getCategories,
        categories,
        podcasts,
        getPodcasts,
        addPodcast,
        deletePodcast,
        postsLoading,
        setPostLoading,
    } = props;

    const fetchData = useCallback(async () => {
        setPostLoading(true);
        await getPodcasts();

        await getCategories();
        setPostLoading(false);
    }, [getCategories, getPodcasts, setPostLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <h3 className="title is-3">Podcasts:</h3>
            <div className="tags">
                {postsLoading && (
                    <progress className="progress is-small is-info" max="100">
                        50%
                    </progress>
                )}
                {!postsLoading &&
                    podcasts.map((p, i) => (
                        <span key={i} className="tag is-info">
                            {p.podcast}
                            <button
                                onClick={async () =>
                                    await deletePodcast(p.id, jwt)
                                }
                                className="delete is-small"
                            />
                        </span>
                    ))}
            </div>

            <hr />

            <div className="control">
                {postsLoading && (
                    <progress className="progress is-small is-info" max="100">
                        50%
                    </progress>
                )}
                {!postsLoading && (
                    <div className="select">
                        <select
                            onChange={async (
                                event: ChangeEvent<HTMLSelectElement>
                            ) => {
                                if (
                                    event.target.value !== 'Add a Podcast' &&
                                    podcasts.filter(
                                        (l) => l.podcast === event.target.value
                                    ).length === 0
                                ) {
                                    await addPodcast(event.target.value, jwt);
                                }
                            }}
                        >
                            <option>Add a Podcast</option>
                            {categories.map((c, index) => (
                                <option key={index}>{c}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPodcasts);
