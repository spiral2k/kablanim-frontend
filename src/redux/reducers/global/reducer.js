import Constants from './constants';

const initialState = {
    route: ''
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case Constants.SET_ROUTE: {
            return Object.assign({}, state, { route: payload });
        }

        default: {
            return state;
        }
    }
};
