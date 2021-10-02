import React, { useState, useEffect }  from 'react';
import { NavLink } from 'react-router-dom';


// https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
// https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native
// https://dev.to/ahmedsarhan/react-hook-form-a-fast-performant-and-easy-way-to-manage-your-forms-in-your-react-js-apps-5em6

const UpdateCourse = (props) => {
    const [state, setState] = useState([{data : []}]);
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${props.match.params.id}`).then(async res => {
                let jsonData = await res.json()
                console.log(jsonData)
                setCourseTitle(jsonData.title);
                setCourseDescription(jsonData.description);
                setEstimatedTime(jsonData.estimatedTime);
                setMaterialsNeeded(jsonData.materialsNeeded);
                setUserInfo(jsonData.user.firstName + " " + jsonData.user.lastName)
            })
    }, [])



    const handleSubmit = (input) => {
        input.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa('joe@smith.com:joepassword')},
            body: JSON.stringify({
                title : courseTitle,
                description : courseDescription,
                estimatedTime : estimatedTime,
                materialsNeeded : materialsNeeded
        })
         
        }

        console.log(requestOptions)
        fetch(`http://localhost:5000/api/courses/${props.match.params.id}`, requestOptions)
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
            <div className="wrap">
                <h2>Update Course</h2>
                {state.data?.length > 0? ( <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>{state.data.map(item => <li>{item}</li>)}
                    </ul>
                </div>):("")}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={courseTitle} onChange={(e) => {setCourseTitle(e.target.value)}}/>

                            <p>By {userInfo}</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}/>

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><NavLink to="/"><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></NavLink>
                </form>
            </div>
        </main>
        )
    };

export default UpdateCourse