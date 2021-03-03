import { RootState } from '../../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import {
    backendLogin,
    backendVerifySession,
} from '../../../redux/Admin/Admin.reducer';
import { setJwt } from '../../../redux/Admin/Admin.action';

interface AdminLoginProps {
    jwt: string;
}

interface AdminLoginActions {
    login: (username: string, password: string) => void;
    verifyAndSetJwt: (inputJwt: string) => void;
}

export type AdminLoginPropsAndActions = AdminLoginProps & AdminLoginActions;

export const mapStateToProps = (state: RootState): AdminLoginProps => {
    return {
        jwt: state.adminState.jwt,
    };
};

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminLoginActions => {
    return {
        login: async (username: string, password: string) => {
            await dispatch(backendLogin(username, password));
        },
        verifyAndSetJwt: async (inputJwt: string) => {
            const verified: any = await dispatch(
                backendVerifySession(inputJwt)
            );
            if (verified) {
                dispatch(setJwt(inputJwt));
            }
        },
    };
};
