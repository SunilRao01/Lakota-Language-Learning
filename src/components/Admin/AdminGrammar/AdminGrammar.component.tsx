import React, { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import {AdminGrammarPropsAndActions, mapDispatchToProps, mapStateToProps} from './AdminGrammar.types';

const AdminGrammar: FC<AdminGrammarPropsAndActions> = (props) => {
    const {
        jwt,
        getCategories,
        categories,
        grammar,
        getGrammar,
        addGrammar,
        deleteGrammar,
        postsLoading,
        setPostLoading,
    } = props;

    const fetchData = useCallback(async () => {
        setPostLoading(true);
        await getGrammar();

        await getCategories();
        setPostLoading(false);
    }, [getCategories, getGrammar, setPostLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <h3 className="title is-3">Grammar:</h3>
            <div className="tags">
                {postsLoading && (
                    <progress className="progress is-small is-info" max="100">
                        50%
                    </progress>
                )}
                {!postsLoading &&
                    grammar.map((g, i) => (
                        <span key={i} className="tag is-info">
                            {g.grammar}
                            <button
                                onClick={async () =>
                                    await deleteGrammar(g.id, jwt)
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
                                    event.target.value !== 'Add a Grammar' &&
                                    grammar.filter(
                                        (g) => g.grammar === event.target.value
                                    ).length === 0
                                ) {
                                    await addGrammar(event.target.value, jwt);
                                }
                            }}
                        >
                            <option>Add a Grammar</option>
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
)(AdminGrammar);
