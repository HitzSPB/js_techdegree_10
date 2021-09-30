import React, { useState, useEffect  } from 'react';


const CourseDetail = (props) => {
    const [state, setState] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${props.match.params.id}`).then(
            res => res.json()).then( data => setState(data)
        )
    }, [])

     console.log(state);
    return (
<main>
            <div class="actions--bar">
                <div class="wrap">
                    <a class="button" href="update-course.html">Update Course</a>
                    <a class="button" href="#">Delete Course</a>
                    <a class="button button-secondary" href="index.html">Return to List</a>
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