import Constants from './constants';

const initialState = {
    loading: false,
    popup: {
        show: false,
        type: '',
        ableToClose: true,
        callback: null
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case Constants.SET_GLOBAL_LOADER: {
            return Object.assign({}, state, { loading: payload });
        }

        case Constants.SET_POPUP: {
            let ableToClose = payload.ableToClose;

            if (typeof payload.ableToClose === 'undefined') {
                ableToClose = true;
            }

            return Object.assign({}, state, {
                popup: {
                    show: payload.show,
                    type: payload.type || '',
                    ableToClose,
                    code: payload.code,
                    callback: payload.callback || null
                }
            });
        }

        case Constants.RESET_UI: {
            return Object.assign({}, initialState);
        }

        default: {
            return state;
        }
    }
};
