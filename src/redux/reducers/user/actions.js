/* Constants */
import Constants from './constants';

export const set = user => ({ type: Constants.SET_USER, payload: user });

export const reset = () => ({ type: Constants.RESET_USER });
