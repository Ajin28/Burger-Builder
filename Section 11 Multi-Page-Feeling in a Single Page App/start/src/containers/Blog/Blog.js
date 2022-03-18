import React, { Component } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts'
import asyncComponent from '../../hoc/asyncComponent'
// import NewPost from './NewPost/NewPost'
// import FullPost from './FullPost/FullPost';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
})

class Blog extends Component {

    state = {
        auth: true
    }



    render() {

        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }} activeClassName="my-active" exact to='/posts'>Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to={{

                                    pathname: '/new-post',
                                    hash: "#submit",
                                    search: '?quick-submit=true'
                                }}>New Post
                                </NavLink>
                            </li>

                        </ul>
                    </nav>
                </header>

                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} />
                        : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>Not Found</h1>} />
                    {/* <Route path="/" component={Posts} /> */}
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>

            </div>
        );
    }
}

export default Blog;
