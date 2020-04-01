import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Actions */
import * as UIActions from '@redux/reducers/ui/actions';

/* Utils */
import * as LangUtils from '@utils/lang';

import './GeneralError.scss';

function GeneralError(props) {
    const reload = () => {
        props.dispatch(UIActions.setPopup({ show: false }));
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return <div className="general-error">ERROR</div>;
}

GeneralError.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    language: state.ui.language
});

export default connect(mapStateToProps)(GeneralError);
