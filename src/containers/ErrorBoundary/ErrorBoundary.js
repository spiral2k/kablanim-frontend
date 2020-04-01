import React, { Component } from 'react'; /* eslint-disable-line */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Constants */
import PopupTypes from '@constants/popupTypes';

/* Actions */
import * as UIActions from '@redux/reducers/ui/actions';

class ErrorBoundary extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(e) {
        console.log('e: ', e);
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            this.props.dispatch(UIActions.setPopup({ show: true, type: PopupTypes.GENERAL_ERROR }));
        }

        return this.props.children;
    }
}

const mapStateToProps = state => ({
    language: state.ui.language
});

export default connect(mapStateToProps)(ErrorBoundary);
