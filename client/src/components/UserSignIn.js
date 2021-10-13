import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './Context';

const SignIn = (props) => {
    const { from } = props.location.state || { from: { pathname: '/' } };
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(UserContext);
    const handleSubmit = async (input) => {
        input.preventDefault();
        let result = await login(email, password)
        if (result.statusCode === 200) {
            // Sends us back to previous url
            if(from.pathname === "/")
            {
                props.history.goBack();
            }
            else
            {
                props.history.push(from.pathname);
            }
        }
        else if (result.statusCode === 401) {
            setState(result.error)
        }
        else {
            props.history.push("/error");
        }
    }
    return (

        <div className="form--centered">
            <h2>Sign In</h2>

            <form>

                {state !== "" ? (<div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul><li>{state}</li>
                    </ul>
                </div>) : ("")}

                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                <NavLink to="/"> <button className="button" type="submit" onClick={handleSubmit}>Sign In</button></NavLink><NavLink to='/'><button className="button button-secondary">Cancel</button></NavLink>
            </form>
            <p>Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!</p>

        </div>)

};


export default SignIn