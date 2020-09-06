import { FilterActionTypes } from './Filter.action';

export interface FilterState {
    filters: {
        ids: number[];
        tags: string[];
        categories: string[];
    };
    currentPage: number;
}

export const initialFilterState: FilterState = {
    filters: {
        ids: [],
        tags: [],
        categories: [],
    },
    currentPage: 1,
};

export const filterReducer = (
    state = initialFilterState,
    action: FilterActionTypes
): FilterState => {
    switch (action.type) {
        case 'SET_FILTER_TAG': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    tags: action.payload,
                },
            };
        }
        case 'SET_FILTER_CATEGORY': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    categories: action.payload,
                },
            };
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.payload,
            };
        }
        default:
            return state;
    }
};
