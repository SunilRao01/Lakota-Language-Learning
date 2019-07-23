export interface SetTagFilter {
    type: 'SET_FILTER_TAG',
    payload: string[]
}

export type FilterActionTypes = SetTagFilter

export const setFilterTags = (tags: string[]): FilterActionTypes => {
    return {
        type: 'SET_FILTER_TAG',
        payload: tags
    }
}
