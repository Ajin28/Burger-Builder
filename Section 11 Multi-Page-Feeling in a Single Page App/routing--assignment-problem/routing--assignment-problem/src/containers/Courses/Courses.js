import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import './Courses.css';
import Course from '../Course/Course'

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    onClickHandler = (id, title) => {
        this.props.history.replace({
            pathname: "/courses/" + id,
            search: "?title=" + title
        })
        //or
        // this.props.history.replace('/courses/' + id + '?title=' + title)
    }
    render() {
        return (

            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map(course => {
                            return <article onClick={() => { this.onClickHandler(course.id, course.title) }} className="Course" key={course.id}>{course.title}</article>;
                        })
                    }
                </section>

                <Route exact path='/courses/:id' component={Course} />
                {/* <Route exact path={this.props.match.url+'/:id'} component={Course} /> */}

            </div>

        );
    }
}

export default Courses;