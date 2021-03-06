import React, { FC, useCallback, useEffect } from 'react';
import { mapDispatchToProps, mapStateToProps } from './MiniSitemap.types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MiniSitemapPropsAndActions } from './MiniSitemap.types';

export const MiniSitemap: FC<MiniSitemapPropsAndActions> = (props) => {
    const {
        getGrammar,
        getLessons,
        getPodcasts,
        getVocabulary,
        setPostLoading,
        grammar,
        lessons,
        podcasts,
        vocabulary,
        postsLoading,
    } = props;

    const fetchData = useCallback(async () => {
        setPostLoading(true);

        await getGrammar();
        await getLessons();
        await getPodcasts();
        await getVocabulary();

        setPostLoading(false);
    }, [getGrammar, getLessons, getPodcasts, getVocabulary, setPostLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container">
            {postsLoading && (
                <progress className="progress is-small is-info" max="100">
                    50%
                </progress>
            )}
            {!postsLoading && (
                <aside className="menu">
                    <p className="menu-label">Lessons</p>
                    <ul className="menu-list">
                        <li>
                            <ul>
                                {lessons.map((l, key) => (
                                    <li key={key}>
                                        <Link
                                            to={`/lessons?category=${l.lesson}&page=1`}
                                        >
                                            {l.lesson}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    <p className="menu-label">Grammar</p>
                    <ul className="menu-list">
                        <li>
                            <ul>
                                {grammar.map((g, key) => (
                                    <li key={key}>
                                        <Link
                                            to={`/grammar?category=${g.grammar}&page=1`}
                                        >
                                            {g.grammar}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    <p className="menu-label">Vocabulary</p>
                    <ul className="menu-list">
                        <li>
                            <ul>
                                {vocabulary.map((v, key) => (
                                    <li key={key}>
                                        <Link
                                            to={`/vocabulary?category=${v.vocab}&page=1`}
                                        >
                                            {v.vocab}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    <p className="menu-label">Podcasts</p>
                    <ul className="menu-list">
                        <li>
                            <ul>
                                {podcasts.map((p, key) => (
                                    <li key={key}>
                                        <Link
                                            to={`/podcasts?category=${p.podcast}&page=1`}
                                        >
                                            {p.podcast}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </aside>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniSitemap);
