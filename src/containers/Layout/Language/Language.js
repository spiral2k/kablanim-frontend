import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';

/* Actions */
import * as UIActions from '@redux/reducers/ui/actions';

/* Constants */
import LanguagesConstants from '@constants/languages';

import './Language.scss';

const LANGUAGE_OPTIONS = [
    { value: LanguagesConstants.ENGLISH, label: 'English' },
    { value: LanguagesConstants.HEBREW, label: 'עברית' }
];

function Language(props) {
    const handleChange = ({ value }) => {
        props.dispatch(UIActions.setRTL(value === LanguagesConstants.HEBREW ? 'rtl' : ''));
        props.dispatch(UIActions.setLanguage(value));
    };

    const getSelected = () => {
        switch (props.language) {
            case LanguagesConstants.HEBREW:
                return { value: LanguagesConstants.HEBREW, label: 'עברית' };

            default:
                return { value: LanguagesConstants.ENGLISH, label: 'English' };
        }
    };

    return (
        <Select
            className={`language-selector ${props.className}`}
            value={getSelected()}
            onChange={handleChange}
            options={LANGUAGE_OPTIONS}
        />
    );
}

Language.propTypes = {
    language: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    className: PropTypes.string
};

Language.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    language: state.ui.language
});

export default connect(mapStateToProps)(Language);
