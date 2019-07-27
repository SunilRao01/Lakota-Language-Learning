import {FilterActionTypes} from './Filter.action'

export interface FilterState {
    filters: {
        ids: number[],
        tags: string[],
        categories: string[]
    }
}

export const initialFilterState: FilterState = {
    filters: {
        ids: [],
        tags: [],
        categories: []
    }
}


export const filterReducer = (
    state = initialFilterState,
    action: FilterActionTypes
): FilterState => {
    switch (action.type) {
        case 'SET_FILTER_TAG': {
            return {...state,
            filters: {
                ...state.filters,
                tags: action.payload
            }}
        }
        case 'SET_FILTER_CATEGORY': {
            return {...state,
                filters: {
                    ...state.filters,
                    categories: action.payload
                }}
        }
        default:
            return state
    }
};
