import axios from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {AdminActionTypes, setJwt} from './Admin.action'

export interface AdminState {
    jwt: string,
    currentPage: number
}

export const initialAdminState: AdminState = {
    jwt: '',
    currentPage: 1
};

const apiUrl = process.env.API_URL ? process.env.API_URL : 'http://localhost:4000'

export const backendLogin = (username: string, password: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.post(`${apiUrl}/login`, {
            email: username,
            password: password
        }).then((res: any) => {
            dispatch(setJwt(res.data.jwt))
        })
    }
}

export const backendVerifySession = (jwt: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async () => {
        return axios.post(`${apiUrl}/verify-session`, {
            token: jwt
        }).then(() => {
            return true
        }).catch((err: any) => {
            if (err && err.response && err.response.status === 401) {
                return false
            }
        }).finally(() => {
            return false
        })
    }
}

export const adminReducer = (
    state = initialAdminState,
    action: AdminActionTypes
): AdminState => {
    switch (action.type) {
        case 'SET_JWT': {
            localStorage.setItem('lakota_jwt', action.payload)

            return {
                ...state,
                jwt: action.payload
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        default:
            return state
    }
};
