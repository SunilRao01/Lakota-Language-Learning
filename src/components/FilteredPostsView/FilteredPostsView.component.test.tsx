import React from 'react'
import {mapDispatchToProps, mapStateToProps} from './FilteredPostsView.component'
import {initialRootState} from '../../store'

describe('FilteredPostsView Component', () => {
    // TODO: Figure out how to test connected component with shallow render + router props

    describe('redux', () => {
        it('should map store to props', () => {
            const startingRootState = initialRootState
            startingRootState.postState.posts = []
            startingRootState.filterState.filters.categories = ['filter cat']
            startingRootState.filterState.filters.tags = ['filter tag']

            const actualProps = mapStateToProps(startingRootState)

            actualProps.posts = []
            actualProps.filterCategories = ['filter cat']
            actualProps.filterTags = ['filter tag']
        });

        it('should map dispatching action to props', () => {
            const mockDispatch = jest.fn()

            const actualProps = mapDispatchToProps(mockDispatch)

            actualProps.setFilterCategories(['new filter cat'])
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'SET_FILTER_CATEGORY',
                payload: ['new filter cat']
            })

            actualProps.setFilterTags(['new filter tag'])
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'SET_FILTER_TAG',
                payload: ['new filter tag']
            })
        })
    })
})
