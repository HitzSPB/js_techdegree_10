import React, { useState, useEffect  } from 'react';
import { NavLink } from 'react-router-dom';
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
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa(`${email}:${password}`)},         
        }

        console.log(requestOptions)
        fetch('http://localhost:5000/api/users', requestOptions)
        .then(async response =>{
            if(!response.ok)
            {
                const json = await response.json()
                if(response.status == 401)
                {
                    await setState("The combination of Username and password did not match a user")
                }
                else
                {
                 console.log(response);
                }
            }
            else
            {
                const jsonData = await response.json();
                setCookie('userinfo', `${jsonData.firstName} ${jsonData.lastName}`, { path: '/'})
                setCookie('username', email, { path: '/'})
                setCookie('userpassword', password, {path: '/'})    
                setCookie('userid', jsonData.id, {path: '/'})    
                props.history.push("/");
            }
        });
};

    return (<div class="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={handleSubmit}>
                    
                {state !== ""? ( <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul><li>{state}</li>
                    </ul>
                </div>):("")}

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