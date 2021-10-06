import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

const SignUp = (props) => {
    const [cookies, setCookie] = useCookies(['username', 'userpassword', 'userinfo'])
    const [state, setState] = useState([{ data: [] }]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (input) => {
        input.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                emailAddress: email,
                password: password
            })

        }
        fetch('http://localhost:5000/api/users', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    const json = await response.json()
                    if (response.status === 400) {
                        await setState({ data: json })
                    }
                    else {
                        props.history.push("/error");
                    }
                }
                else {
                    const requestSignInOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + btoa(`${email}:${password}`)
                        },
                    }

                    fetch('http://localhost:5000/api/users', requestSignInOptions)
                        .then(async response => {
                            if (!response.ok) {
                                if (response.status === 401) {
                                    await setState("The combination of Username and password did not match a user")
                                }
                                else {
                                    props.history.push("/error");
                                }
                            }
                            else {
                                const jsonData = await response.json();
                                setCookie('userinfo', `${jsonData.firstName} ${jsonData.lastName}`, { path: '/' })
                                setCookie('username', email, { path: '/' })
                                setCookie('userpassword', password, { path: '/' })
                                setCookie('userid', jsonData.id, { path: '/' })
                                props.history.push("/");
                            }

                        })
                }
            });
    }
    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>

                    {state.data?.length > 0 ? (<div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>{state.data.map((item, i) => <li key={i}>{item}</li>)}
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