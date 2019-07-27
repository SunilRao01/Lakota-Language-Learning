import React from 'react';
import {Home, mapDispatchToProps, mapStateToProps} from './Home.component'
import {addPost} from '../../redux/Posts/Posts.action'
import {RootState} from '../../store'
import {initialFilterState} from '../../redux/Filter/Filter.reducer'

describe('Home', () => {
    describe('redux', () => {
        it('should mapDispatchToProps', () => {
            const mockDispatch = jest.fn()

            const actual = mapDispatchToProps(mockDispatch)

            actual.addPost({
                id: 1,
                postTitle: 'post title',
                creationDate: new Date(5, 1),
                categories: [],
                tags: [],
                postContent: 'new sample post'
            })

            expect(mockDispatch).toHaveBeenCalledWith(addPost({
                id: 1,
                postTitle: 'post title',
                creationDate: new Date(5, 1),
                categories: [],
                tags: [],
                postContent: 'new sample post'
            }))
        });

        it('should mapStateToProps', () => {
            const initialState: RootState = {
                filterState: initialFilterState,
                postState: {
                    posts: [{
                        id: 1,
                        postTitle: 'post title',
                        creationDate: new Date(5, 1),
                        categories: [],
                        tags: [],
                        postContent: 'new sample post'
                    }]
                }
            }

            const actual = mapStateToProps(initialState)

            expect(actual.posts).toEqual(initialState.postState.posts)
        });
    });
});
