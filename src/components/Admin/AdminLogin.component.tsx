import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react'
import {ThunkDispatch} from 'redux-thunk'
import {backendLogin, backendVerifySession} from '../../redux/Admin/Admin.reducer'
import {connect} from 'react-redux'
import {RootState} from '../../store'
import {Redirect} from 'react-router'
import {setJwt} from '../../redux/Admin/Admin.action'

interface AdminLoginProps {
    jwt: string
}

interface AdminLoginActions {
    login: (username: string, password: string) => void,
    verifyAndSetJwt: (inputJwt: string) => void
}

type AdminLoginPropsAndActions = AdminLoginProps & AdminLoginActions

export const AdminLoginComponent: FC<AdminLoginPropsAndActions> = props => {
    const { jwt, login, verifyAndSetJwt } = props;

    const [inputUsername, setInputUsername] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    useEffect(() => {
        let jwt: (string | null) = localStorage.getItem('lakota_jwt')

        if (jwt) {
            verifyAndSetJwt(jwt)
        }
    }, [verifyAndSetJwt])

    if (jwt) {
        return <Redirect to={'/admin/posts'}/>
    }

    return (
        <div>
            <div className="field">
                <form onSubmit={(e: SyntheticEvent) => {
                    e.preventDefault()
                    login(inputUsername, inputPassword)
                }}>
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Enter Username"
                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                   setInputUsername(e.target.value)
                               }}/>
                    </div>
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Enter Password"
                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                   setInputPassword(e.target.value)
                               }}/>
                    </div>
                    <button className="button is-info admin-button"
                            type='submit'>Login
                    </button>
                </form>
            </div>
        </div>
    )
};

export const mapStateToProps = (state: RootState): AdminLoginProps => {
    return {
        jwt: state.adminState.jwt
    }
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): AdminLoginActions => {
    return {
        login: async (username: string, password: string) => {
            await dispatch(backendLogin(username, password))
        },
        verifyAndSetJwt: async (inputJwt: string) => {
            const verified: any = await dispatch(backendVerifySession(inputJwt))
            if (verified) {
                dispatch(setJwt(inputJwt))
            }
        }
    }
}

export const AdminLogin = connect(mapStateToProps, mapDispatchToProps)(AdminLoginComponent)

