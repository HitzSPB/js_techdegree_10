import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { useCookies } from 'react-cookie'

const CourseDetail = (props) => {
    const [cookies] = useCookies(['username', 'userpassword', 'userid'])
    const [state, setState] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${props.match.params.id}`).then(
            async res => {
                if (res.ok) {
                    const jsonData = await res.json()
                    setState(jsonData)
                }
                else if (res.status === 404) {
                    props.history.push("/notfound");
                }
                else {
                    props.history.push("/error");
                }

            }
        )
    }, [props])

    const handleRemove = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${cookies.username}:${cookies.userpassword}`)
            },
        }

        fetch(`http://localhost:5000/api/courses/${props.match.params.id}`, requestOptions)
            .then(async response => {
                if (!response.ok) {
                    props.history.push("/error");
                }
                else {
                    props.history.push("/");
                }
            });
    }
    return (
        <main>
            <div className="actions--bar">
                {parseInt(state?.user?.id) === parseInt(cookies?.userid) ? (
                    <div className="wrap">
                        <NavLink to={`/courses/${props.match.params.id}/update`} className="button">Update Course</NavLink>
                        <button className="button" onClick={handleRemove}>Delete Course</button>
                        <NavLink to='/' className="button button-secondary">Return to List</NavLink>
                    </div>) : (<div className="wrap"><NavLink to='/' className="button button-secondary">Return to List</NavLink></div>)}
            </div>

            <div className="wrap">
                {<h2>Course Detail</h2>}
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{state?.title ?? ""}</h4>
                            <p>By {state?.user?.firstName ?? ""} {state?.user?.lastName ?? ""}</p>
                            <ReactMarkdown>{state?.description ?? ""}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{state?.estimatedTime ?? ""}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown>{state?.materialsNeeded ?? ""}</ReactMarkdown>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
};
export default CourseDetail