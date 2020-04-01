import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Config from '@config/config';

/* Actions */
import * as UIActions from '@redux/reducers/ui/actions';

/* Constants */
import PopupTypes from '@constants/popupTypes';

/* Utils */
import * as LangUtils from '@utils/lang';

/* Components */
import GeneralError from './Types/GeneralError/GeneralError';

import './Popup.scss';

function Popup(props) {
    if (!props || !props.popup || !props.popup.show) return null;

    const getPopupContent = () => {
        switch (props.popup.type) {
            case PopupTypes.GENERAL_ERROR:
                return <GeneralError />;

            default:
                return null;
        }
    };

    const handleClose = () => props.dispatch(UIActions.setPopup({ show: false }));

    return (
        <div className="popup-container">
            <div className="popup">
                {props.popup.ableToClose ? (
                    <img
                        className="x right"
                        onClick={handleClose}
                        src={`${Config.imagesPath}/x.svg`}
                        alt="close"
                        role="button"
                    />
                ) : null}
                {getPopupContent()}

                {props.popup.code && (
                    <div className="error-code">
                        {LangUtils.translate('common.popups.errorCode')}: {props.popup.code}
                    </div>
                )}
            </div>
        </div>
    );
}

Popup.propTypes = {
    dispatch: PropTypes.func.isRequired,
    popup: PropTypes.shape({
        show: PropTypes.bool,
        type: PropTypes.string
    }).isRequired
};

const mapStateToProps = state => ({
    popup: state.ui.popup
});

export default connect(mapStateToProps)(Popup);
