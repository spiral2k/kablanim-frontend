/* eslint-disable camelcase */
import axios from 'axios';
import Config from '@config/config';

/* Actions */
import * as UIActions from '@redux/reducers/ui/actions';

const apiMiddleware = ({ dispatch }) => next => action => {
    next(action);
    if (action.type !== 'API') return;

    const { url, method, data, baseURL, withLoader, timeout, useUserToken } = action.payload;
    let { headers } = action.payload;

    if (withLoader) dispatch(UIActions.setLoader(true));

    const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
    axios.defaults.baseURL = baseURL || Config.apiURL;

    if (!headers) headers = {};
    if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    if (useUserToken) {
        const { token } = window.getState().user.token;
        headers.Authorization = `Bearer ${token}`;
    }

    return axios
        .request({
            url,
            method,
            [dataOrParams]: data,
            headers,
            timeout: 300000
        })
        .then(res => {
            if (withLoader) setTimeout(() => dispatch(UIActions.setLoader(false)), timeout || 1000);

            if (typeof res.data.responseCode === 'number' && res.data.responseCode < 0) {
                return Promise.reject(res.data);
            }

            return Promise.resolve(res.data);
        })
        .catch(e => {
            if (withLoader) dispatch(UIActions.setLoader(false));
            return Promise.reject(e);
        });
};

export default apiMiddleware;
