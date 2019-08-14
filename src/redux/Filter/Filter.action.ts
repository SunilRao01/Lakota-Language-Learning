export interface SetTagFilter {
    type: 'SET_FILTER_TAG',
    payload: string[]
}

export interface SetCategoryFilter {
    type: 'SET_FILTER_CATEGORY',
    payload: string[]
}

export type FilterActionTypes = SetTagFilter | SetCategoryFilter

export const setFilterTags = (tags: string[]): FilterActionTypes => {
    return {
        type: 'SET_FILTER_TAG',
        payload: tags
    }
}

export const setFilterCategories = (categories: string[]): FilterActionTypes => {
    return {
        type: 'SET_FILTER_CATEGORY',
        payload: categories
    }
}
