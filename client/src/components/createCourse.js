import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer, UserContext } from './Context';

// https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
// https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native
// https://dev.to/ahmedsarhan/react-hook-form-a-fast-performant-and-easy-way-to-manage-your-forms-in-your-react-js-apps-5em6

const CreateCourse = (props) => {
    const [state, setState] = useState([{ data: [] }]);
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    
    const {currentUser, handleLogin} = useContext(UserContext);

    const handleSubmit = (input) => {
        input.preventDefault();
        console.log(props.value)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${props.value.state.username}:${props.value.state.userpassword}`)
            },
            body: JSON.stringify({
                title: courseTitle,
                description: courseDescription,
                estimatedTime: estimatedTime,
                materialsNeeded: materialsNeeded
            })

        }
        fetch('http://localhost:5000/api/courses', requestOptions)
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
                    props.history.push("/");
                }
            });
    };

    return (
        <Consumer>
            {value => (
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    {state.data?.length > 0 ? (<div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>{state.data.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>) : ("")}
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="courseTitle" type="text" value={courseTitle} onChange={(e) => { setCourseTitle(e.target.value) }} />

                                <p>By {value.state.userinfo}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription" onChange={(e) => setCourseDescription(e.target.value)}></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" onChange={(e) => setEstimatedTime(e.target.value)} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">Create Course</button><NavLink to="/"><button className="button button-secondary">Cancel</button></NavLink>
                    </form>
                </div>
            </main>)}
        </Consumer>
    )
};

export default CreateCourse