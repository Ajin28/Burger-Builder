import axios from 'axios';
import React, { Component } from 'react';
import './FullPost.css';

class FullPost extends Component {

    state = {
        post: null
    }

    // Infinite Loop
    // componentDidUpdate() {
    //     if (this.props.id) {
    //         axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
    //             .then(res => {
    //                 console.log(res);
    //                 this.setState({
    //                     post: res.data
    //                 })
    //             })
    //     }
    // }


    componentDidMount() {
        this.loadData();
    }

    loadData() {
        if (this.props.match.params.id) {
            // if (!this.state.post || (this.state.post && this.state.post.id !== +this.props.match.params.id)) {

            if (!this.state.post || (this.state.post && this.state.post.id != this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(res => {
                        console.log(res);
                        this.setState({
                            post: res.data
                        })
                    })
            }
        }
    }
    componentDidUpdate() {
        this.loadData();
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(res => {
                console.log(res)
            })
    }

    componentWillUnmount() {
        console.log("[Fullpost.js] Unmounted");
    }


    render() {
        console.log("[FullPost.js] props", this.props)
        let post = <p style={{ textAlign: 'center' }} >Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{ textAlign: 'center' }} >Loading</p>;
        }

        if (this.state.post) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;