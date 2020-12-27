import { FilterActionTypes } from 'redux/Filter/Filter.action';

export interface SetJWT {
    type: 'SET_JWT';
    payload: string;
}

export interface SetCurrentPage {
    type: 'SET_CURRENT_PAGE';
    payload: number;
}

export type AdminActionTypes = SetJWT | SetCurrentPage;

export const setJwt = (jwt: string): AdminActionTypes => {
    return {
        type: 'SET_JWT',
        payload: jwt,
    };
};

export const setCurrentPage = (pageNum: number): FilterActionTypes => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: pageNum,
    };
};
