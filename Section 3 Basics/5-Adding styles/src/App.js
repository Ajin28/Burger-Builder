import React, { Component } from 'react';
// STYLING TYPE 1
import './App.css';
import Person from './Person/Person';

// this is maybe something you didn't know because it's not necessarily intuitive but by default, no file
// is included into your project into the code which gets created by the build workflow.
// You always have to import files to add them to the game.
// So we import the person component in our app.js file
// and we also import the app.css file here.
// here you need the file extension,you can only omit it for javascript files.

//  if you inspect your code, we have the person class here and if you scroll all the
// way up to the head section here in the developer tools
// you see that there, we actually have these style tags which you can't find in the html file in the public
// folder. There we got no style tags in the head section,
// just some links to the manifest and so on,so not even to css files.
// The reason for this is that the style tags are injected dynamically by webpack,

// You also see that automatic prefixing though which is very convenient because it makes sure that we don't have to do that.
// We can write the shortest css code possible or needed and it will automatically prefix it to work in as many browsers as possible.
class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    })
  }

  render() {
    // STYLING TYPE 2
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          //This is actually the normal style attribute made available by jsx
          style={style}
          onClick={() => this.switchNameHandler('Maximilian!!')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age} />
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}
// Styling the hover effect is pretty hard when using inline styles.
// Always be aware, you can use a css file Then the styles to find there are global.
// So if we change button here suppose App.css/Person.css, all the buttons in our whole app will be changed,
// So this might not be what you want but on the other hand you can use the normal css syntax or you use inline styles as you do here.
// Then the styling is scoped to the component or to the element you actually add it to,
// but you have some restrictions of not being able to leverage the full power of css.
export default App;
