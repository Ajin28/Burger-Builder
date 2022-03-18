import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  // OLD SYNTAX
  constructor(props) {

    // This will basically execute the constructor of the component you're extending and that is important
    // to make sure that everything gets initialized correctly and you can do things like access this.setState.
    super(props);
    console.log('[App.js] constructor');

    // If  you're working in a project set up that doesn't support the below  modern Javascript syntax, you can set state here in constructor and that will just work fine. 

    // this.state = {
    //   persons: [
    //     { id: 'asfa1', name: 'Max', age: 28 },
    //     { id: 'vasdf1', name: 'Manu', age: 29 },
    //     { id: 'asdf11', name: 'Stephanie', age: 26 }
    //   ],
    //   otherState: 'some other value',
    //   showPersons: false
    // }
  }

  // MODERN SYNTAX
  // This down here is just a more modern syntax which behind the scenes will basically add
  // the constructor for you, call super props and set the state up in the constructor,
  // This is equivalent to our constructor function above

  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  // This is a static method and statuc key is neccessary so that react can execute it correctly.
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // Will be removed in future
  // Gives warning Unsafe legacy lifecycles will not be called for components using new component APIs.
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    // Make http/https request here, Asynchronously change state here not anywhere else
    console.log('[App.js] componentDidMount');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  //   Now accessing the render method by the way does not mean that the real DOM gets re-rendered,
  // it simply means that React will now re-render its internal virtual DOM and then check if the real DOM
  // needs to be changed and that is also something
  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <div className={classes.App}>
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
