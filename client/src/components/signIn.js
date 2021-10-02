import React, { useState, useEffect  } from 'react';
import { NavLink } from 'react-router-dom';

const SignIn = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (input) => {
        input.preventDefault();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa(`${email}:${password}`)},         
        }

        console.log(requestOptions)
        fetch('http://localhost:5000/api/users', requestOptions)
            .then(async response =>{
                if(!response.ok)
                {
                    console.log(response);
                }
                else
                {                    
                    props.history.push("/");
                }
            });
    };

    return (<div class="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={handleSubmit}>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={(e) => {setEmail(e.target.value)}} />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" onChange={(e) => {setPassword(e.target.value)}} />
                    <button class="button" type="submit">Sign In</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
                
            </div>)

};
    

export default SignIn