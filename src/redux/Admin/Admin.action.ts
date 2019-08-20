
export interface SetJWT {
    type: 'SET_JWT',
    payload: string
}

export type AdminActionTypes = SetJWT

export const setJwt = (jwt: string): AdminActionTypes => {
    return {
        type: 'SET_JWT',
        payload: jwt
    }
}

