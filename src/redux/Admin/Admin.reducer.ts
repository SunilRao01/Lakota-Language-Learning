import axios from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {AdminActionTypes, setJwt} from './Admin.action'

export interface AdminState {
    jwt: string
}

export const initialAdminState: AdminState = {
    jwt: ''
};

export const backendLogin = (username: string, password: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.post('http://localhost:4000/login', {
            email: username,
            password: password
        }).then((res: any) => {
            dispatch(setJwt(res.data.jwt))
        })
    }
}

export const adminReducer = (
    state = initialAdminState,
    action: AdminActionTypes
): AdminState => {
    switch (action.type) {
        case 'SET_JWT': {
            return {
                ...state,
                jwt: action.payload
            }
        }
        default:
            return state
    }
};
