import React, { useState, useEffect  } from 'react';
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const SignUp = (props) => {
    const [cookies, setCookie] = useCookies(['username', 'userpassword', 'userinfo'])
    const [state, setState] = useState([{data : []}]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (input) => {
        input.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName : firstName,
                lastName : lastName,
                emailAddress : email,
                password : password
        })
         
        }

        console.log(requestOptions)
        fetch('http://localhost:5000/api/users', requestOptions)
            .then(async response =>{
                if(!response.ok)
                {
                    const json = await response.json()
                    if(response.status == 400)
                    {
                        await setState({data : json })
                    }
                    else
                    {
                     console.log(response);
                    }
                }
                else
                {                   
                    const requestSignInOptions = {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json',
                        'Authorization': 'Basic '+btoa(`${email}:${password}`)},         
                    }
            
                    fetch('http://localhost:5000/api/users', requestSignInOptions)
                    .then(async response =>{
                        if(!response.ok)
                        {
                            const json = await response.json()
                            if(response.status == 401)
                            {
                                console.log(json);
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
                            console.log(jsonData);
                            setCookie('userinfo', `${jsonData.firstName} ${jsonData.lastName}`, { path: '/'})
                            setCookie('username', email, { path: '/'})
                            setCookie('userpassword', password, {path: '/'})    
                            setCookie('userid', jsonData.id, {path: '/'})    
                            props.history.push("/");
                        }
                    
                    })
            }
    });
    }
    return (
        <main>
            <div class="form--centered">
                <h2>Sign Up</h2>
                
                <form onSubmit={handleSubmit}>

                {state.data?.length > 0? ( <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>{state.data.map(item => <li>{item}</li>)}
                    </ul>
                </div>):("")}
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" onChange={(e) => {setFirstName(e.target.value)}}/>
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" onChange={(e) => {setLastName(e.target.value)}}/>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        </main>
        )
    };

export default SignUp