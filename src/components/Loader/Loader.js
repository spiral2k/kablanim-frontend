import React from 'react';

import './Loader.scss';

const SIZE = {
    ALL_THE_PAGE: 3,
    BIG: 2,
    SMALL: 1
};

function Loader({ size }) {
    const allThePage = () => {
        return (
            <div className="loader-bg">
                <div className="lds-dual-ring" />
            </div>
        );
    };

    const small = () => {
        return <div className="lds-dual-ring small" />;
    };

    const getLoader = () => {
        switch (size) {
            case SIZE.SMALL:
                return small();

            case SIZE.ALL_THE_PAGE:
                return allThePage();

            default:
                return allThePage();
        }
    };

    return getLoader();
}

export default Loader;
