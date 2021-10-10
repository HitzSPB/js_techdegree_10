import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './Context';

const SignIn = (props) => {
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useContext(UserContext);
    const handleSubmit = (input) => {
        input.preventDefault();
       var result = login(email, password)
       console.log(result)
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
        <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>

    </div>)

};


export default SignIn