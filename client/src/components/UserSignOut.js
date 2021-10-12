
import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './Context';

const SignOut = (props) => {
    // const {logout} = useContext(UserContext);
    // useEffect(() => {
    //     logout(props)
    // }, [logout, props])
    // logout(props)
    return (
        <div>
            <UserContext.Consumer>{value => value.logout()}</UserContext.Consumer>
            <Redirect to="/" />
        </div>
    )
};

export default SignOut;