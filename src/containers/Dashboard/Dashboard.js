import React from 'react';
import { connect } from 'react-redux';

import withAuth from '@containers/withAuth/withAuth';
import { Route, Link } from 'react-router-dom';

import Procurement from '@containers/Procurement/Procurement';
import Employees from '@containers/Employees/Employees';
import { element } from 'prop-types';

function Dashboard({ match, user }) {
    const getSidebarMenu = () => {
        const elements = [];

        elements.push(<Link to={`${match.url}/items`}>מוצרים</Link>);
        elements.push(<Link to={`${match.url}/providers`}>ספקים</Link>);
        elements.push(<Link to={`${match.url}/orders`}>הזמנות</Link>);
        elements.push(<Link to={`${match.url}/sites`}>אתרים</Link>);
        elements.push(<Link to={`${match.url}/users`}>עובדים</Link>);

        return elements;
    };

    // export default {
    //     ADMIN: 1,
    //     CONTRACTOR: 2,
    //     EMPLOYEE: 3,
    //     PROCUREMENT_MANAGER: 4,
    //     SITE_MANAGER: 5,

    //     /* Custom */
    //     ITEMS: 10,
    //     USERS: 11,
    //     ORDERS: 12,
    //     PROVIEDERS: 13,
    //     SITES: 14
    // };

    return (
        <div className="">
            <div className="menu">
                {/* <Link to={`${match.url}/procurement`}>רכש</Link>
                <Link to={`${match.url}/users`}>מוצרים</Link>
                <Link to={`${match.url}/providers`}>ספקים</Link>
                <Link to={`${match.url}/orders`}>הזמנות</Link>

                <Link to={`${match.url}/employees`}>עובדים</Link>
                <Link to={`${match.url}/sites`}>אתרים</Link> */}

                {getSidebarMenu()}
            </div>

            <Route path={`${match.path}/procurement`} component={Procurement} />
            <Route path={`${match.path}/employees`} component={Employees} />
        </div>
    );
}

const getStateAsProps = state => ({
    user: state.user
});

export default connect(getStateAsProps)(withAuth(Dashboard));
