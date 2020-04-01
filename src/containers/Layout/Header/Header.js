import React from 'react';

import './Header.scss';

/* Components */
import Regular from './Regular/Regular';

function Header() {
    return (
        <header className="header-container">
            <Regular />
        </header>
    );
}

export default Header;
