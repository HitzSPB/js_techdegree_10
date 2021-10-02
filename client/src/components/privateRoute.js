//https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({component: Component, ...rest}) => {
    const [cookies, setCookie] = useCookies(['username', 'userpassword', 'userinfo'])
    return (
        <Route {...rest} render={props => (
            cookies.username !== undefined ?
                <Component {...props} />
            : <Redirect to="/sign-in" />
        )} />
    );
};

export default PrivateRoute;