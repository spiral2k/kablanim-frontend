import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Utils */
import * as LangUtils from '@utils/lang';

import './Footer.scss';

function Footer(props) {
    return (
        <footer className="footer-container">
            <div className="footer">FOOTER</div>
        </footer>
    );
}

Footer.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Footer);
