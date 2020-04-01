import * as RequestActions from '@redux/request/actions';

export const login = (data = {}, options = {}) =>
    RequestActions.ApiCall({
        url: `/login`,
        method: 'POST',
        data,
        ...options
    });
