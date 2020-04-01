import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Components */
import ErrorBoundary from '@containers/ErrorBoundary/ErrorBoundary';
import Loader from '@components/Loader/Loader';
import Popup from '@containers/Popup/Popup';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import './style/Global.scss';
import './style/Layout.scss';
import './style/rtl.scss';
import './style/Mobile.scss';

class Layout extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired
    };

    componentDidMount() {
        window.goToRoute = route => {
            window.scrollTo(0, 0);
            this.props.history.push(route);
        };
    }

    render() {
        return (
            <ErrorBoundary>
                <div className="contractor-container rtl">
                    {this.props.loading ? <Loader size={3} /> : null}
                    <Popup />
                    <Header />
                    {this.props.children}
                    <Footer />
                </div>
            </ErrorBoundary>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.ui.loading
});

export default connect(mapStateToProps)(withRouter(Layout));
