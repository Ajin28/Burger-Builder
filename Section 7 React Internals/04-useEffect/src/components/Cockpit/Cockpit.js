import React, { useEffect } from 'react';

import classes from './Cockpit.css';

const cockpit = props => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request...
    //const timer =
    setTimeout(() => {
      alert('Saved data to cloud!');
    }, 1000);
    return () => {
      //clearTimeout(timer)
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []);
  // The first argument of useEffect hook is the function/effect we want to execute affter every render cycle (both the first render and after every update).  
  // The second argument (optional) of useEffect is an array. 
  // This array contains dependencies. Whenever the dependencies inside the array change our function/effect executes otherwise React skips our effect/function
  // Eg- [props.person] tells react to execute our function only when prop.persons changes.
  // Eg- Empty array [] is like componentDidMount().. Our function executes only once when component renders  first time. 
  // [] tells react that you have no dependencies, they can never change and therefore our function/effect can never re-run after the first time.

  // Optionally We can return a function inside our effect/function to do clean up work similar to componentWillUnmount();
  // This return function cleans up the effects of previous render and runs before running the effects next time.
  // clean up function is also tied to the second argument of useffect function.
  // 2nd Arg              Effect            cleanup
  // []           - componentDidMount  , componentWillUnmount
  // [dependency] - componentDidUpdate , runs before each componentDidUpdate

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    };
  });

  // useEffect();

  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  console.log('[Cockpit.js] rendering...')
  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
    </div>
  );
};

export default cockpit;
