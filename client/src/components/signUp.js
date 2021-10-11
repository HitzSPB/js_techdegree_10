import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './Context';
const SignUp = (props) => {
    const [state, setState] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {userSignUp} = useContext(UserContext);

    const handleSubmit = async (input) => {
        input.preventDefault();
        let result = await userSignUp(firstName, lastName, email, password);
        if(result.statusCode === 200)
        {
            props.history.push("/")
        }
        else if(result.statusCode === 400 ||result.statusCode === 401 )
        {
            setState(result.error)
        }
        else
        {
            props.history.push("/error");
        }
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    {state?.length > 0 ? (<div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>{state?.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>) : ("")}
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" onChange={(e) => { setFirstName(e.target.value) }} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" onChange={(e) => { setLastName(e.target.value) }} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button><NavLink to='/'><button className="button button-secondary">Cancel</button></NavLink>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        </main>
    )
};

export default SignUp