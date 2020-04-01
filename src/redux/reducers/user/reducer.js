import Constants from './constants';

/* Constants */
import UserStatus from '@constants/userStatus';

const initialState = {
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    status: UserStatus.GUEST,
    token: '',
    roles: [],
    language: 'he_IL',
    contractorId: ''
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case Constants.SET_USER: {
            return Object.assign({}, state, { ...state, ...payload });
        }

        case Constants.RESET_USER: {
            return Object.assign({}, initialState);
        }

        default: {
            return state;
        }
    }
};
