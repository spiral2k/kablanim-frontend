import Constants from './constants';

const initialState = {
    loading: false,
    email: '',
    password: '',
    error: ''
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case Constants.SET_LOGIN: {
            return Object.assign({}, state, { ...state, ...payload });
        }

        default: {
            return state;
        }
    }
};
