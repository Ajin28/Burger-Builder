import React, { Component } from 'react';

class Course extends Component {
    render() {
        let title;

        // const queryParamTitle = new URLSearchParams(this.props.location.search)
        // for (let param of queryParamTitle.entries()) {
        //     console.log(param); // yields ['start', '5']
        //     title = param[1]
        // }

        title = this.props.location.search.replace(/%20/g, " ").match(/=(.*)/)[1]
        console.log(title);

        return (
            <div>
                <h1>{title}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;