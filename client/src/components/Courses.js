// Import
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Courses = (props) => {

    // Fetches current list of available courses 
    const [state, setState] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/api/courses").then( async res => 
            {
                if(res.status === 500)
                {
                    props.history.push("/error");
                }
                let json = await res.json()
                setState(json)
            }
            )
    }, [props])
    return (
        <div className="wrap main--grid">
            {state.map(item => <NavLink to={`/courses/${item.id}`} className="course--module course--link" key={item.id}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{item.title}</h3>
            </NavLink>)}
            <NavLink to={"/courses/create"} className="course--module course--add--module">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </NavLink>
        </div>)
}

export default Courses;