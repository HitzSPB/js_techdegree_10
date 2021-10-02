import React, { useState, useEffect  } from 'react';
import { NavLink } from 'react-router-dom';

const CourseDetail = (props) => {
    const [state, setState] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${props.match.params.id}`).then(
            res => res.json()).then( data => setState(data)
        )
    }, [])

    const handleRemove = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa('joe@smith.com:joepassword')},
        }

        fetch(`http://localhost:5000/api/courses/${props.match.params.id}`, requestOptions)
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
    }
     console.log(state);
    return (
    <main>
            <div class="actions--bar">
                <div class="wrap">
                    <NavLink to={`/courses/${props.match.params.id}/update`} className="button">Update Course</NavLink>
                    <button class="button" onClick={handleRemove}>Delete Course</button>
                    <NavLink to='/' className="button button-secondary">Return to List</NavLink>
                </div>
            </div>
            
            <div class="wrap">
                {<h2>Course Detail</h2>}
                <form>
                    <div class="main--flex">
                        <div>
                            <h3 class="course--detail--title">Course</h3>
                            <h4 class="course--name">{state?.title ?? ""}</h4>
                            <p>By {state?.user?.firstName ?? ""} {state?.user?.lastName ?? ""}</p>

                            <p>{state?.description ?? ""}</p>
                            
                            </div>
                        <div>
                            <h3 class="course--detail--title">Estimated Time</h3>
                            <p>{state?.estimatedTime ?? ""}</p>

                            <h3 class="course--detail--title">Materials Needed</h3>
                            {state?.materialsNeeded ?? ""}
                        </div>
                    </div>
                </form>
            </div>
        </main>
        )
    };
export default CourseDetail