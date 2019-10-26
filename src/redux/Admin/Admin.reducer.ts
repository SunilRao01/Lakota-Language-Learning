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

const apiUrl = process.env.NODE_ENV !== 'production' ? 'localhost' : '67.205.165.131'

export const backendLogin = (username: string, password: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: Dispatch) => {
        return axios.post(`http://${apiUrl}:4000/login`, {
            email: username,
            password: password
        }).then((res: any) => {
            dispatch(setJwt(res.data.jwt))
        })
    }
}

export const backendVerifySession = (jwt: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async () => {
        return axios.post(`http://${apiUrl}:4000/verify-session`, {
            token: jwt
        }).then(() => {
            return true
        }).catch((err: any) => {
            if (err && err.response && err.response.status == 401) {
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
        default:
            return state
    }
};
