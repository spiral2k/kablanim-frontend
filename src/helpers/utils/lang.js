/* Constants */
import LanguagesConstants from '@constants/languages';

import hebrew from '../language/he';
import english from '../language/en';

const getTranslation = (key, language) => {
    return key.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, language);
};

export const translate = key => {
    switch ('IL') {
        case LanguagesConstants.HEBREW:
            return getTranslation(key, hebrew);

        case LanguagesConstants.ENGLISH:
            return getTranslation(key, english);

        default:
            return null;
    }
};

export const setPlaceholders = (string, data) => {
    if (!string) return '';
    return string.replace(/<%(.*?)%>/g, (i, match) => data[match]);
};
