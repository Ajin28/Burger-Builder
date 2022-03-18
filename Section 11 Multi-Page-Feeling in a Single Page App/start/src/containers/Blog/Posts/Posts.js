import React from 'react';
import axios from '../../../axios'
import Post from '../../../components/Post/Post'
import './Posts.css'
import { Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'
//import { Link } from 'react-router-dom'

class Posts extends React.Component {
    state = {
        posts: []

    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: this.props.match.url + '/' + id })
        //or
        //this.props.history.push("/posts/" + id)

    }

    // componentDidMount which will be executed each time we changed a page
    componentDidMount() {
        console.log('[Posts.js props]', this.props);
        axios.get('/posts')
            .then(res => {
                const posts = res.data.slice(0, 4);
                const updatedposts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({
                    posts: updatedposts
                });

            })
            .catch(err => {
                console.log(err);
                //this.setState({ error: true })
            })

    }

    // Component is unmounted each time we navigate through react router
    componentWillUnmount() {
        console.log("[Posts.js] Unmounted");
    }


    render() {
        let posts = <p style={{ textAlign: 'center' }} >Something went wrong</p>;
        if (!this.state.error)
            posts = this.state.posts.map(post => {
                return (
                    // <Link key={post.id} to={'/posts/' + post.id}>
                    <Post
                        key={post.id}
                        author={post.author}
                        title={post.title}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link> 
                )
            })

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        )
    }

}

export default Posts