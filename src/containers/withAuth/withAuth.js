import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Constants */
import Routes from '@constants/routes';

export default C => {
    class withAuth extends Component {
        static propTypes = {
            dispatch: PropTypes.func.isRequired,
            token: PropTypes.string
        };

        static defaultProps = {
            token: ''
        };

        constructor(props) {
            super(props);

            this.state = {
                showComponent: false
            };
        }

        async componentDidMount() {
            try {
                if (!this.props.token) return window.goToRoute(Routes.ROOT);

                this.setState({ showComponent: true });
            } catch (e) {
                if (!this.props.token) return window.goToRoute(Routes.ROOT);
            }
        }

        render() {
            return this.state.showComponent ? <C {...this.props} /> : null;
        }
    }

    const mapStateToProps = state => ({
        token: state.user.token
    });

    return connect(mapStateToProps)(withAuth);
};
