import Constants from './constants';

export const setLogin = value => ({ type: Constants.SET_LOGIN, payload: value });

export const reset = () => ({
    type: Constants.RESET_LOGIN
});
