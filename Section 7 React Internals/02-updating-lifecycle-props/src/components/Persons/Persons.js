import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {

  // Warning: `Persons` uses `getDerivedStateFromProps` but its initial state is undefined.
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  // Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.
  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  // Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.
  // componentWillUpdate() {
  //  console.log('[Persons.js] componentWillUpdate');
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Persons.js] shouldComponentUpdate');
    return true;
  }

  // This method should return something otherwise we get a waring
  // snapshot is a data package  which you receive in componentDidUpdate,
  // so that you can save some state right before the update, 
  // like for example the scroll position of your page and then you can
  // use it to update the DOM again or update the scrolling position of the user let's say in componentDidUpdate once the DOM has been re-rendered.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot!' };
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  render() {
    console.log('[Persons.js] rendering...');
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={event => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;
