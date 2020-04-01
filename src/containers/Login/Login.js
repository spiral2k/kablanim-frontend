import React from 'react';
import { connect } from 'react-redux';

/* Components */
import InputBlock from '@components/InputBlock/InputBlock';

/* Actions */
import * as UserAPI from '@api/user';
import * as LoginActions from '@reducers/login/actions';
import * as UserActions from '@reducers/user/actions';

/* Utils */
import * as LangUtils from '@utils/lang';

/* Constants */
import UserStatus from '@constants/userStatus';
import Routes from '@constants/routes';

import './Login.scss';

function Login(props) {
    const handleLoginChange = (value, type) => {
        console.log(type);
        props.dispatch(LoginActions.setLogin({ [type]: value }));
    };

    const login = () => {
        props.dispatch(LoginActions.setLogin({ error: '', loading: true }));

        props
            .dispatch(UserAPI.login({ email: props.email, password: props.password }))
            .then(user => {
                props.dispatch(UserActions.set({ ...user, status: UserStatus.REGISTERED }));
                window.goToRoute(Routes.DASHBOARD);
                props.dispatch(LoginActions.setLogin({ error: '', loading: false }));
            })
            .catch(() => {
                props.dispatch(
                    LoginActions.setLogin({
                        error: LangUtils.translate('pages.login.incorrectCredentials'),
                        loading: false
                    })
                );
            });
    };

    return (
        <div className="login-container">
            <div className="login-title">{LangUtils.translate('pages.login.title')}</div>

            <div className="error">{props.error}</div>

            <InputBlock
                id="email"
                placeholder={LangUtils.translate('pages.login.email')}
                value={props.email}
                onChange={e => handleLoginChange(e.target.value, 'email')}
            />

            <InputBlock
                id="password"
                placeholder={LangUtils.translate('pages.login.password')}
                value={props.password}
                onChange={e => handleLoginChange(e.target.value, 'password')}
            />

            <button className="lgn-button" type="button" onClick={login}>
                {LangUtils.translate('pages.login.button')}
            </button>
        </div>
    );
}

const getStateAsProps = state => ({
    email: state.login.email,
    password: state.login.password,
    error: state.login.error
});

export default connect(getStateAsProps)(Login);
