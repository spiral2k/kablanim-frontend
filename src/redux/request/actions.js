import Constants from './constants';

export const accessDenied = () => {};

export const apiError = () => {};

export const apiStart = () => {};

export const apiEnd = () => {};

export const ApiCall = payload => {
    return {
        type: Constants.API,
        payload: { ...payload }
    };
};
