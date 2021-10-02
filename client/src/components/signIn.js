import React, { useState } from 'react';
import { useCookies } from 'react-cookie'

const SignIn = (props) => {
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['username', 'userpassword', 'userinfo', 'userid'])

    const handleSubmit = (input) => {
        input.preventDefault();
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${email}:${password}`)
            },
        }
        fetch('http://localhost:5000/api/users', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    if (response.status == 401) {
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
                    props.history.goBack();
                }
            });
    };

    return (<div className="form--centered">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>

            {state !== "" ? (<div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul><li>{state}</li>
                </ul>
            </div>) : ("")}

            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" onChange={(e) => { setEmail(e.target.value) }} />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
            <button className="button" type="submit">Sign In</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>

    </div>)

};


export default SignIn