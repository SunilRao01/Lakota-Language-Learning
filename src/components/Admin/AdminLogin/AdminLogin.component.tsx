import React, {
    ChangeEvent,
    FC,
    SyntheticEvent,
    useEffect,
    useState,
} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
    AdminLoginPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './AdminLogin.types';

export const AdminLogin: FC<AdminLoginPropsAndActions> = (props) => {
    const { jwt, login, verifyAndSetJwt } = props;

    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    useEffect(() => {
        let jwt: string | null = localStorage.getItem('lakota_jwt');

        if (jwt) {
            verifyAndSetJwt(jwt);
        }
    }, [verifyAndSetJwt]);

    if (jwt) {
        return <Redirect to={'/admin/posts'} />;
    }

    return (
        <div>
            <div className="field">
                <form
                    onSubmit={(e: SyntheticEvent) => {
                        e.preventDefault();
                        login(inputUsername, inputPassword);
                    }}
                >
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter Username"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setInputUsername(e.target.value);
                            }}
                        />
                    </div>
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            placeholder="Enter Password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setInputPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        className="button is-info admin-button"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLogin);
