# reacr-router vs react-router-dom

react-router contains all the common components between react-router-dom and react-router-native. When should you use one over the other? If you're on the web then react-router-dom should have everything you need as it also exports the common components you'll need. If you're using React Native, react-router-native should have everything you need for the same reason. So you'll probably never have to import anything directly from react-router

Your first link is to the master branch, which at this time is v3.

In v4, react-router exports the core components and functions. react-router-dom exports DOM-aware components, like <Link> (which renders an <a>) and <BrowserRouter> (which interacts with the browser's window.history ).

react-router-dom re-exports all of react-router's exports, so you only need to import from react-router-dom in your project.

# Links

Provides declarative, accessible navigation around your application

```
<div className='Blog'>
    <header>
        <nav>
            <ul>
                <li><a href='/'>Home</a>li>
                <li><a href=new-post'>New Post</a>li
            </ul>
        </nav>
    </header>

    <Route path="/" exact component={Posts} />
    <Route path="/new-post" exact component={NewPost} />

</div>
```

Right now our application has an issue though, we can click these links they are normal anchor tags but each time our application actually reloads, as can see if you watch the reload icon next to the URL bar.

Now this is not a problem here but theoretically a reloading application means that your javascript code is starting anew and therefore all previous application state is lost.

This is rarely what you want in your react application, as long as the user is navigating around in it, you want to not reload the page, you want to just re-render the page in the parts where it needs to be re-rendered to look like the new page.

So we need to change to behaviour so that we don't have a normal link here which reloads the page but that instead we prevent the reloading of the page and let react router only re-render parts of the dom that need to be re-rendered.

```
 <div className='Blog'>
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to={{
                    pathname:'new-post',
                    has"#submit",
                    search:'?quick-submit=true'
                }}>New Post</Link></li>
            </ul>
        </nav>
    </header>

    <Route path="/" exacomponent={Posts} />
    <Route path="/new-post" exact component={NewPost} />

</div>
```

Now we want to make sure that we stay inside the application when clicking on links inside of it, when coming from outside of it and directly entering /new-post, obviously it will reload the app if we hit enter,that's just how the internet works, We send a new request to get a new page.
But inside of our application when we click links, we don't need that behavior because we're inside of it.
We can basically prevent the default and make sure no requests get sent and handle that click internally to re-render the page with javascript.

React Router provides a `<Link>` component to create links in your application. Wherever you render a `<Link>`, an anchor (`<a>`) will be rendered in your HTML document.

Link alone of course doesn't do much because we need to tell react router where this link should lead to.

We do it as with the `to` property, the to property in its simplest form is a string, like to='/'.
Now this is essentially kind of the same as a href="/" but react router will create the anchor tag and then prevent default which would be to send a new request and instead handle that click on itself that is why we need to use `Link` component.

- to : string
  A string representation of the Link location, created by concatenating the location’s pathname, search, and hash properties.

  ```
  <Link to="/courses?sort=name" />
  ```

- to : object
  An object that can have any of the following properties:

  - pathname: A string representing the path to link to.
  - search: A string representation of query parameters.
  - hash: A hash to put in the URL, e.g. #a-hash.
  - state: State to persist to the location

  ```
  <Link
  to={{
   pathname: "/courses",
   search: "?sort=name",
   hash: "#the-hash",
   state: { fromDashboard: true }
  }}
  />
  ```

- to: function
  A function to which current location is passed as an argument and which should return location representation as a string or as an object

  ```
   <Link to={location => ({ ...location, pathname: "/courses" })} />
   <Link to={location => `${location.pathname}?sort=name`} />
  ```

React Router has a issue of not scrolling to #hash-fragments of the url when using the `<Link>` component to navigate.
This issue is solved by-
[react-router-hash-link](https://www.npmjs.com/package/react-router-hash-link)

# Route props

- path: string/ string[]/ regex understood by path-to-regexp@^1.7.0
- strict: boolean
- exact: boolean
- location: obj
- children: func
- render: func
- component : React function/class component

# withRouter

You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.

### Blog.js

```
<Route path="/" exact component={Posts} />
```

### Posts.js

```
import React from 'react';
import Post from '../../../components/Post/Post'


class Posts extends React.Component {
   render() {
       console.log(this.props) //match,history,location available
        return (
            <section className="Posts">
                <Post
                    key={post.id}
                    author={post.author}
                    title={post.title}
                    clicked={() => this.postSelectedHandler(post.id)}
                 />
            </section>
        )
    }

}

export default Posts
```

### Post.js

```
import React from 'react';

import './Post.css';

const post = (props) => (
    console.log(props) //match, location,history not available here
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

export default post;
```

So the routing related the props are not passed down the component tree, we can't access them in components which we simply embed as part of the jsx code of a container (For example not in Post.js component).
They are only availabe in the component inside render methods (component,render,children) of Route.

Now if you wanted to use the props there, there are two ways to get access, one of course is we can pass them on with the spread operator and this.props, this passes any props in Posts.js container onto the Post component.
Here we could also explicitly target certain props like for example if you want to pass on the match property.

```
import React from 'react';
import Post from '../../../components/Post/Post'


class Posts extends React.Component {
   render() {
       console.log(this.props) //match,history,location available
        return (
            <section className="Posts">
                <Post
                    {...this.props}
                    //or match={this.props.match}
                    key={post.id}
                    author={post.author}
                    title={post.title}
                    clicked={() => this.postSelectedHandler(post.id)}
                 />
            </section>
        )
    }

}
```

The other way to pass route props is a higher order component called withRouter we can import from react-router-dom.

Now withRouter is a higher order component which we use by wrapping our export with it.

So withRouter is a nice way of making a component `Route Aware` and it will use or it will get the props containing information for the nearest loaded route.
So in this case since post is included in posts, we get the same props as we receive in posts.

```
import React from 'react';
import { withRouter } from 'react-router-dom'
import './Post.css';

const post = (props) => {
    console.log('[Post.js] props', props);
    return (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    )
};

export default withRouter(post);
```

# NavLink

The <NavLink> is a special type of <Link> that can style itself as “active” when its to prop matches the current location.
A special version of the <Link> that will add styling attributes to the rendered element (anchor tag) when it matches the current URL.

Attributes/props of Navlink:

- activeClassName: string
  The class to give the element when it is active. The default given class is active. This will be joined with the className prop.

  ```
  <NavLink to="/faq" activeClassName="selected">
  FAQs
  </NavLink>
  ```

- activeStyle: object
  The styles to apply to the element when it is active.

  ```
  <NavLink to="/faq" activeStyle={
      {
          fontWeight: "bold",
          color: "red"
       }
  }>
  FAQs
  </NavLink>
  ```

- exact: bool
  When true, the active class/style will only be applied if the location is matched exactly.

- strict: bool
  When true, the trailing slash on a location’s pathname will be taken into consideration when determining if the location matches the current URL. See the <Route strict> documentation for more information.

- isActive: func
  A function to add extra logic for determining whether the link is active. This should be used if you want to do more than verify that the link’s pathname matches the current URL’s pathname.
- location: object
  The isActive compares the current history location (usually the current browser URL). To compare to a different location, a location can be passed.

```
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>

// When the URL is /react, this renders:
// <a href="/react" className="hurray">React</a>

// When it's something else:
// <a href="/react">React</a>
```

```

<nav>
    <ul>
        <li>
            <NavLink activeStyle={{
                color: '#fa923f',
                textDecoration: 'underline'
            }} activeClassName="my-active" exact to='/'>Home</NavLink>
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
```

The `Link` component makes a anchor tag behind the scenes which is managed by the react router preventing the default behavoiur. (which would be to really send that request) but this anchor tag has no class added to it.

```
<li>
<Link to='/'>Home</Link>
</li>
```

```
<li><a href="/">Home</a></li>
```

Navlink component -is pretty similar to link but it has some extra props which allow us to define some styling for the active link.

```
<li>
<NavLink to='/'>Home</NavLink>
</li>
```

```
<li>
   <a aria-current="page" class="active" href="/">Home</a>
</li>
```

### Navlink props

- exact

  css

  ```
  .Blog a:hover,
  .Blog a:active,
  .Blog .active {
  color: #fa923f;
  }
  ```

  js

  ```
       <li>
            <NavLink activeStyle={{
                color: '#fa923f',
                textDecoration: 'underline'
            }} activeClassName="my-active" exact to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to={{

                pathname: '/new-post',
                hash: "#submit",
                search: '?quick-submit=true'
            }}>New Post
             </NavLink>
        </li>
  ```

  html

  ```
  <ul><li><a aria-current="page" class="active" href="/">Home</a></li><li><a href="/new-post?quick-submit=true#submit" aria-current="page" class="active">New Post</a></li></ul>
  ```

  If we go on newpost link both have active class.
  When checking whether a link is active or not, it treats path as a prefixes, and `/`
  and `/new-post` both match so we have to add `exact` here just as on the route, to tell react router no, the full path should be matched to be the active link.

  ```
       <li>
            <NavLink exact to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to={{

                pathname: '/new-post',
                hash: "#submit",
                search: '?quick-submit=true'
            }}>New Post
             </NavLink>
        </li>

  ```

- activeClassName='string'
  By default active class is added to achor tag.
  In order to add a different classname this attribute is used.

- activeStyle={ object}
  We can also provide inline styling for actilve link with this attribute

# URL parts

- url parameters
  Key/value pairs parsed from the URL corresponding to the dynamic segments of the path

Example

```
http://localhost:3000/143

<Route exact path="/:id">

match: {
    path: "/:id",
    url: "/1",
    isExact: true,
    params:{
        id:"143"
    }
}
(this.)props.match.params.id
(this.)props.match.params.paramName
```

- query params / string
  The URL query string

Example -

```
http://localhost:3000/new-post?quick-submit=true

<Link to="/new-post?quick-submit=true" >Go to Start</Link>

or
<Link
    to={{
        pathname: '/new-post',
        search: '?quick-submit'
    }}
>Go to Start</Link>

location:{
hash: ""
key: "3x68dh"
pathname: "/new-post"
search: "?quick-submit=true"
}

(this.)props.location.search= "?quick-submit=true"

```

React router makes it easy to get access to the search string: props.location.search .

But that will only give you something like `"?quick-submit=true"`

You probably want to get the key-value pair, without the ? and the = . Here's a snippet which allows you to easily extract that information:

```
componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
        console.log(param); // yields ['start', '5']
    }
}
```

URLSearchParams is a built-in object, shipping with vanilla JavaScript. It returns an object, which exposes the entries() method. entries() returns an Iterator - basically a construct which can be used in a for...of... loop (as shown above).

When looping through query.entries() , you get arrays where the first element is the key name (e.g. start ) and the second element is the assigned value (e.g. 5 ).

- fragments
  The URL hash fragment

```
http://localhost:3000/my-path#start-position

<Link to="/my-path#start-position">Go to Start</Link>

or
<Link
    to={{
        pathname: '/my-path',
        hash: 'start-position'
    }}
    >Go to Start</Link>

location:{
hash: "#start-position"
pathname: "my-path"
search: ""
}

(this.)props.location.hash=#start-position

```

# Switch

There are two route matching components: Switch and Route. When a <Switch> is rendered, it searches through its children <Route> elements to find one whose path matches the current URL. When it finds one, it renders that <Route> and ignores all others. This means that you should put <Route>s with more specific (typically longer) paths before less-specific ones.
If no <Route> matches, the <Switch> renders nothing (null).

- Renders the first child <Route> or <Redirect> that matches the location.

- How is this different than just using a bunch of <Route>s?
  <Switch> is unique in that it renders a route exclusively. In contrast, every <Route> that matches the location renders inclusively. Consider these routes:

  ```
    import { Route } from "react-router";

    let routes = (
      <div>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/:user">
          <User />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </div>
    );
  ```

- If the URL is /about, then <About>, <User>, and <NoMatch> will all render because they all match the path. This is by design, allowing us to compose <Route>s into our apps in many ways, like sidebars and breadcrumbs, bootstrap tabs, etc.

- Occasionally, however, we want to pick only one <Route> to render. If we’re at /about we don’t want to also match /:user (or show our “404” page). Here’s how to do it with Switch:

  ```
  import { Route, Switch } from "react-router";

  let routes = (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/:user">
        <User />
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  );
  ```

- Now, if we’re at /about, <Switch> will start looking for a matching <Route>. <Route path="/about"/> will match and <Switch> will stop looking for matches and render <About>. Similarly, if we’re at /michael then <User> will render.

# Navigating Programtically

## history route prop

history route prop has some methods for navigating around like go back or go forward, which do exactly what they sound like, they basically do the same you have with the forward and backward buttons.

There also a push method which allows you to push a new page onto the stack of pages because navigation basically just is about a stack of pages.

That is why the back and forward buttons work in the browser because you can go back to the last page on the stack or forward again to that page on the stack you had on the top of it
before you went back.

history objects typically have the following properties and methods:

- length - (number) The number of entries in the history stack
- action - (string) The current action (PUSH, REPLACE, or POP)
- location - (object) The current location. May have the following properties:
  - pathname - (string) The path of the URL
  - search - (string) The URL query string
  - hash - (string) The URL hash fragment
  - state - (object) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
- push(path, [state]) - (function) Pushes a new entry onto the history stack
- replace(path, [state]) - (function) Replaces the current entry on the history stack
- go(n) - (function) Moves the pointer in the history stack by n entries
- goBack() - (function) Equivalent to go(-1)
- goForward() - (function) Equivalent to go(1)
  block(prompt) - (function) Prevents navigation

### history is mutable

The history object is mutable. Therefore it is recommended to access the location from the render props of <Route>, not from history.location. This ensures your assumptions about React are correct in lifecycle hooks. For example:

```
class Comp extends React.Component {
  componentDidUpdate(prevProps) {
    // will be true
    const locationChanged =
      this.props.location !== prevProps.location;

    // INCORRECT, will *always* be false because history is mutable.
    const locationChanged =
      this.props.history.location !== prevProps.history.location;
  }
}

<Route component={Comp} />;
```

## location route prop

Locations represent where the app is now, where you want it to go, or even where it was. It looks like this:

```
location:{
  key: 'ac3df4',
  pathname: '/somewhere',
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

The router will provide you with a location object in a few places:

- Route component as this.props.location
- Route render as ({ location }) => ()
- Route children as ({ location }) => ()
- withRouter as this.props.location

It is also found on history.location but you shouldn’t use that because it’s mutable.

A location object is never mutated so you can use it in the lifecycle hooks to determine when navigation happens, this is really useful for data fetching and animation.

You can provide locations instead of strings to the various places that navigate:

- Web NavLink to
- Web Link to
- Native Link to
- Redirect to
- history.push
- history.replace

```
    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: "/" + id })
        //or
        //this.props.history.push("/" + id)

    }
```

Normally you just use a string, but if you need to add some “location state” that will be available whenever the app returns to that specific location, you can use a location object instead. This is useful if you want to branch UI based on navigation history instead of just paths (like modals).

```
// usually all you need
<Link to="/somewhere"/>

// but you can use a location instead
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```

Finally, you can pass a location to the following components:

- Route
- Switch

This will prevent them from using the actual location in the router’s state. This is useful for animation and pending navigation, or any time you want to trick a component into rendering at a different location than the real one.

## match route prop

A match object contains information about how a <Route path> matched the URL. match objects contain the following properties:

- params - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
- isExact - (boolean) true if the entire URL was matched (no trailing characters)
- path - (string) The path pattern used to match. Useful for building nested <Route>s
- url - (string) The matched portion of the URL. Useful for building nested <Link>s

You’ll have access to match objects in various places:

- Route component as this.props.match
- Route render as ({ match }) => ()
- Route children as ({ match }) => ()
- withRouter as this.props.match
- matchPath as the return value
- useRouteMatch as the return value

If a Route does not have a path, and therefore always matches, you’ll get the closest parent match. Same goes for withRouter.

# Nested Routes

Takeaway - parent route should be matched in order for the nested route to work therfore `exact` should be removed from parent route.

```
Parent Route
<Route path="/posts" exact component={Posts} />

Nested Route (inside Posts component)
<Route path= "/posts/:id" exact component={FullPost} />
```

If parent route (/posts) has exact and we go to url /posts/1 then parent route doesn't match hence Posts component isn't rendered and thereby the nested route to Fullpost component isn't rendered.
To fix this we just remove exact. Now when we go to /post/1 it matches the parent route and further the nested route inside it :)

# Redirect

Any time that you want to force navigation, you can render a <Redirect>. When a <Redirect> renders, it will navigate using its to prop.

Rendering a <Redirect> will navigate to a new location. The new location will override/replace the current location in the history stack, like server-side redirects (HTTP 3xx) do.
This is same as calling replace method on history route prop.
`this.props.history.replace(pathname)`

```
<Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>

```

### Redirect props

- to: string, object

The URL to redirect to. Any valid URL path that path-to-regexp@^1.7.0 understands.
All URL parameters (/:id) that are used in `to` must be covered by `from`.

```
<Redirect to="/somewhere/else" />


<Redirect
  to={{
    pathname: "/login",
    search: "?utm=your+face",
    state: { referrer: currentLocation }
  }}
/>
```

The state object can be accessed via this.props.location.state in the redirected-to component. This new referrer key (which is not a special name) would then be accessed via this.props.location.state.referrer in the Login component pointed to by the pathname '/login'

- push: bool

When true, redirecting will push a new entry onto the history instead of replacing the current one.

```
<Redirect push to="/somewhere/else" />
```

- from :string/regex

A pathname to redirect from. Any valid URL path that path-to-regexp@^1.7.0 understands.

This can only be used to match a location when rendering a <Redirect> inside of a <Switch>.

All matched URL parameters are provided to the pattern in `to`. Must contain all parameters that are used in `to`. Additional parameters not used by `to` are ignored.

```
<Switch>
  <Redirect from="/old-path" to="/new-path" />
  <Route path="/new-path">
    <Place />
  </Route>
</Switch>

// Redirect with matched parameters
<Switch>
  <Redirect from="/users/:id" to="/users/profile/:id" />
  <Route path="/users/profile/:id">
    <Profile />
  </Route>
</Switch>
```

- exact: bool

Match `from` exactly; equivalent to Route.exact.
This can only be used in conjunction with `from` to exactly match a location when rendering a <Redirect> inside of a <Switch>.

```
<Switch>
  <Redirect exact from="/" to="/home" />
  <Route path="/home">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Switch>
```

- strict: bool

Match `from` strictly; equivalent to Route.strict.
This can only be used in conjunction with `from` to strictly match a location when rendering a <Redirect> inside of a <Switch>.

- sensitive: bool

Match `from` case sensitive; equivalent to Route.sensitive.
This can only be used in conjunction with `from` to strictly match a location when rendering a <Redirect> inside of a <Switch>.

# Gaurds (Private Routes / Protected Routes)

If you conditionally render the route or redirect you can control who reaches that route.

```
componentDidMount(){
  if(!this.props.isAuthenticated){
    this.props.history.replace("/")
  }
}
```

```
{this.state.auth?<Route path="/new-post"  exact component={NewPost}>: null}
```

# 404 case ( Unknown Routes)

```
 <Route render={() => <h1>Not Found</h1>} />
```

Should always be at last inside Switch component

# Loading Routes in Lasily (Code Splitting / Lazy Loading)

The technique of downloading only what you need is known as code splitting or lazy loading .

Here you would essentially want to make sure that in your component, you're only loading the component once you need it.

## For react version < 16.6

- NOTE - This technique will work for react router 4 and for create react app because code splitting depends heavily on the webpack configuration you are using

To implement code splitting or lazy loading, with create react app and react router 4 -

- 1. Create a hoc component - asyncComponent.js

  ```
  import React from 'react';

  const asyncComponent = (importComponent) => {

      return class extends React.Component {
          state = {
              component: null
          }

          componentDidMount() {
              importComponent()
                  .then(cmp => {
                      this.setState({
                          component: cmp.default
                      })
                  })
          }


          render() {
              const C = this.state.component

              return C ? <C {...this.props} /> :    null
          }
      }
  }

  export default asyncComponent;
  ```

  `importcomponent` function reference in the end, on executing `importcomponent` function it will return a promise.
  Inside then block we will recieve an argument `cmp` which will have a property `default` containing the dynamically loaded component

- 2. Rendering component dynamically

  ```
  import asyncComponent from '../../hoc/asyncComponent'
  ```

  Whenever we use import like this, webpack will include it in the global bundle.

  Now for a lazy loading, this is exactly the opposite of what we want to do,we don't want to include it in the bundle, we want to load it when needed.

  Still webpack needs to be able to dynamically prepare some extra bundle for this potentially loaded code.

  For this, we use import keyword as a function.
  This is a special syntax ( dynamic import syntax ) in which whatever comes between the parentheses here is only imported when that function `AsyncNewPost` is executed and `AsyncNewPost` will only be executed once we render AsyncNewPost to the screen.

  ```
  const AsyncNewPost = asyncComponent(() => {
      return import('./NewPost/NewPost')
  })
  ```

  ```
     {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}

  ```

chunk.js file will be loaded when we go to /new-post route. This is an extra bundle webpack created because whilst bundling our code, it detected this dynamic syntax.

This extra bundle will contain new post component and all potential child components that were exclusive to that component if any.

This bundle won't be added to the main bundle,
instead it's prepared to load when we actually include AsyncNewPost which we only do when navigating to /newpost.

This is how you load components asynchronously,
This is extremely useful in bigger apps where there are bigger chunks of code, a whole
feature area in your application for example which might not even be visited by the user so you can save that code up front to only load it when needed.

## For react version >= 16.6

So if you are using the latest re-act version i re-act 16.6 or higher then you have a new way
of lazy loading your routes because react 16.6 adds a new method on the react object the lazy method which you can use to load your data your components asynchronously which means only when they are needed.

For example useful when having routing in your application because only when a user visits
a certain route that component will be required and re-act lazy allows you to defer the rendering and the loading of the code of that component until it is required.

Whenever you have a use case whereas some component is loaded at a later point of time for
example because you have a check some condition that needs to be met to render a certain component in all such cases you could use react lazy.

- The React.lazy function lets you render a dynamic import as a regular component.

- React.lazy takes a function that must call a dynamic import(). This must return a Promise which resolves to a module with a default export containing a React component.

```
import OtherComponent from './OtherComponent';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
```


- This will automatically load the bundle containing the OtherComponent when this component is first rendered.

- The lazy component should then be rendered inside a Suspense component, which allows us to show some fallback content (such as a loading indicator) while we’re waiting for the lazy component to load.

- The fallback prop accepts any React elements that you want to render while waiting for the component to load. You can place the Suspense component anywhere above the lazy component. You can even wrap multiple lazy components with a single Suspense component.

```
<Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
</Suspense>
```

- React.lazy currently only supports default exports. If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default. This ensures that tree shaking keeps working and that you don’t pull in unused components.

```
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

- Error Boundary: If the other module fails to load (for example, due to network failure), it will trigger an error. You can handle these errors to show a nice user experience and manage recovery with Error Boundaries. Once you’ve created your Error Boundary, you can use it anywhere above your lazy components to display an error state when there’s a network error.

```
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

# Example

- Dynamically importing required component through React.lazy()

React will execute this code when we render this `AsyncComponent`

```
const AsyncComponent= React.lazy(()=> import('./NewPost/NewPost'))
```

The component which we want to load dynamically
should be `default export` as named exports are not supported here by react

```
export default NewPost;
```

2. Dynamically rendering the required through React.Suspense

```

<Route path="/new-post" render={()=>
  <React.Suspense fallback={<div>Loading...</div>}>
     <AsyncComponent>
  </React.Suspense>
} />

```

Suspense Component takes a fallback prop which should be JSX code.
This JSX code will actually be rendered in cases where re-act basically postpones the rendering of `AsyncComponent`.
And of course that doesn't have to be a div with loading that could be a spinner or anything like that.

chunk.js file will be loaded when we go to /new-post route. This is an extra bundle webpack created because whilst bundling our code, it detected this dynamic syntax.


# Setting base path

if url is like example.com/myapp meaning all our react code is indside mypaa folder we need re -routed to example.com/myapp

whenever you are servung our app from sub directory make sure to set the basename
deafult basename='/'

<BrowserRouter basename="/myapp">