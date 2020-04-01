import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Components */
import UserSection from '@containers/Layout/Header/UserSection/UserSection';

import './Regular.scss';

function Regular(props) {
    return (
        <div className={`header-regular-container `}>
            <div className="container">
                LOGO
                <UserSection />
            </div>
        </div>
    );
}

Regular.propTypes = {};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Regular);
