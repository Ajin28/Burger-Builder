# What is a Hook?

A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components. We’ll learn other Hooks later.

### When would I use a Hook?

If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. Now you can use a Hook inside the existing function component.

# useState hook

```
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

```

- Takes initial state as argument
- Returns an array (of 2 values) whose first elment is the current state and second element is the function used to update the state.
- To update the state call the function returned by useEffect with new state as a paramenter

## What does calling useState do?

It declares a “state variable”. Our variable is called count but we could call it anything else, like banana. This is a way to “preserve” some values between the function calls — useState is a new way to use the exact same capabilities that this.state provides in a class. Normally, variables “disappear” when the function exits but state variables are preserved by React.

## What do we pass to useState as an argument?

The only argument to the useState() Hook is the initial state. Unlike with classes, the state doesn’t have to be an object. We can keep a number or a string if that’s all we need. In our example, we just want a number for how many times the user clicked, so pass 0 as initial state for our variable. (If we wanted to store two different values in state, we would call useState() twice.)

### What does useState return?

It returns a pair of values (Array with two values): the current state and a function that updates it. This is why we write const [count, setCount] = useState(). This is similar to this.state.count and this.setState in a class, except you get them in a pair.

### Updating state

Whenever we want to update the state we pass the new state as an argument to the funtion returned by the useState hook.

```
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  increaseCountHandler=()=>{
      setCount(count + 1)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={this.increaseCountHandler}>
       Click me
      </button>
    </div>
  );
}
```

Unlike this.setState in a class, updating a state variable always replaces it instead of merging it.
So make sure new state either includes everything or split the state in different state objects [something, setSomething].

## useEffect hook

In React class components, the render method itself shouldn’t cause side effects. It would be too early — we typically want to perform our effects after React has updated the DOM.

This is why in React classes, we put side effects into componentDidMount and componentDidUpdate.

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- The first argument of useEffect hook is the function/effect we want to execute affter every render cycle (both the first render and after every update).

- (Optional) The second argument (optional) of useEffect is an array.

  - This array contains dependencies. Whenever the dependencies inside the array change our function/effect executes otherwise React skips our effect/function
  - Eg- `[props.person]` tells react to execute our function only when `prop.persons` changes.
  - Eg- Empty array [] is like `componentDidMount()`. Our function/effect executes only once when component renders for the first time.

  - [] tells react that you have no dependencies, they can never change and therefore our function/effect can never re-run after the first time.This is exact behaviour of componentDidMount() , componentWillUnmount()

- (Optional) our effect/function can return a function to do clean up work.
  React also cleans up effects from the previous render before running the effects next time
  Here clean up can be skipped with second argument of the useEffect function.

| 2nd Arg        | Effect                                 | cleanup                               |
| -------------- | -------------------------------------- | ------------------------------------- |
|                | componentDidMount + componentDidUpdate | runs before each componentDidUpdate   |
| `[]`           | componentDidMount                      | componentWillUnmount                  |
| `[dependency]` | componentDidMount + Dependency changes | runs before each time Depency changes |

<br><br>

### What does useEffect do?

By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.
useEffect takes a function as a parameter and executes it for every render cycle and that includes the first one. So it is componentDidMount and componentDidUpdate combined in one effect.

```
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request...
    setTimeout(() => {
      alert('Saved data to cloud!');
    }, 1000);
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []);
```

### Why did we return a function from our effect?

This is the optional cleanup mechanism for effects. Every effect may return a function that cleans up after it. This lets us keep the logic for adding and removing subscriptions close to each other. They’re part of the same effect!

### When exactly does React clean up an effect?

React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time.
