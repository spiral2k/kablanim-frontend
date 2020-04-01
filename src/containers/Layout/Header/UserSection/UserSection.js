import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Config from '@config/config';

/* Actions */
import * as UIActions from '@redux/reducers/ui/actions';

/* Constants */
import Routes from '@constants/routes';

/* Utils */
import * as LangUtils from '@utils/lang';

import './UserSection.scss';

class UserSection extends Component {
    static logout() {
        window.dispatch(UIActions.reset());

        // window.goToRoute(Routes.ROOT);
    }

    static propTypes = {};

    static defaultProps = {};

    render() {
        return null;
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(UserSection);
