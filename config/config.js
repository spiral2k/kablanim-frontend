const getAPIURL = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return 'NO_URL';
        case 'staging':
            return 'NO_URL';

        default:
            return 'http://localhost:9001/api';
    }
};

export default {
    name: 'kablanim-fe',
    isDev: process.env.NODE_ENV !== 'development' || !process.env.NODE_ENV,
    isProd: process.env.NODE_ENV === 'production',
    isStaging: process.env.NODE_ENV === 'staging',
    apiURL: getAPIURL()
};
