export interface SetTagFilter {
    type: 'SET_FILTER_TAG',
    payload: string[]
}

export interface SetCategoryFilter {
    type: 'SET_FILTER_CATEGORY',
    payload: string[]
}

export interface SetCurrentPage {
    type: 'SET_CURRENT_PAGE',
    payload: number
}

export type FilterActionTypes = SetTagFilter | SetCategoryFilter | SetCurrentPage

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

export const setCurrentPage = (pageNum: number): FilterActionTypes => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: pageNum
    }
}
