import Constants from './constants';

export const setLoader = isActive => ({ type: Constants.SET_GLOBAL_LOADER, payload: isActive });

export const setLanguage = language => ({ type: Constants.SET_LANG, payload: language });

export const setRTL = isActive => ({ type: Constants.SET_RTL, payload: isActive });

export const setPopup = popup => ({ type: Constants.SET_POPUP, payload: popup });

export const reset = () => ({
    type: Constants.RESET_UI
});
