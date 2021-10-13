//https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './Context';
const PrivateRoute = ({ component: Component, ...rest }) => {
    const {currentUser} = useContext(UserContext);
    return (
        <Route {...rest} render={props => (
            currentUser.username !== "" ?
                <Component {...props} />
                : <Redirect to={{pathname: "/signin", state: { from: props.location}}} />
        )} />
    );
};

export default PrivateRoute;