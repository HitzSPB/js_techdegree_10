import React, { useState, useEffect  } from 'react';
import { NavLink } from 'react-router-dom';

const SignUp = (props) => {
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
                    props.history.push("/");
                }
            });
    };

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