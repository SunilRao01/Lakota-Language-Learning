import React, { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import {AdminVocabularyPropsAndActions, mapDispatchToProps, mapStateToProps} from './AdminVocabulary.types';

const AdminVocabulary: FC<AdminVocabularyPropsAndActions> = (props) => {
    const {
        jwt,
        getCategories,
        categories,
        vocabulary,
        getVocab,
        addVocab,
        deleteVocab,
        postsLoading,
        setPostLoading,
    } = props;

    const fetchData = useCallback(async () => {
        setPostLoading(true);
        await getVocab();

        await getCategories();
        setPostLoading(false);
    }, [getCategories, getVocab, setPostLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <h3 className="title is-3">Vocabulary:</h3>
            <div className="tags">
                {postsLoading && (
                    <progress className="progress is-small is-info" max="100">
                        50%
                    </progress>
                )}
                {!postsLoading &&
                    vocabulary.map((g, i) => (
                        <span key={i} className="tag is-info">
                            {g.vocab}
                            <button
                                onClick={async () =>
                                    await deleteVocab(g.id, jwt)
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
                                    event.target.value !== 'Add a Vocab' &&
                                    vocabulary.filter(
                                        (g) => g.vocab === event.target.value
                                    ).length === 0
                                ) {
                                    await addVocab(event.target.value, jwt);
                                }
                            }}
                        >
                            <option>Add a Vocab</option>
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
)(AdminVocabulary);
