import React from 'react'
import {filterReducer, initialFilterState} from './Filter.reducer'
import {setFilterCategories, setFilterTags} from './Filter.action'

describe('filterReducer', () => {
    it('should properly set filter tags by SET_FILTER_TAG action', () => {
        const actualState = filterReducer(initialFilterState, setFilterTags(['new tag']))

        expect(actualState.filters.tags.length).toEqual(1)
        expect(actualState.filters.tags[0]).toEqual('new tag')
    })

    it('should property set filter categories by SET_FILTER_CATEGORY', () => {
        const actualState = filterReducer(initialFilterState, setFilterCategories(['new cat']))

        expect(actualState.filters.categories.length).toEqual(1)
        expect(actualState.filters.categories[0]).toEqual('new cat')
    });
})
