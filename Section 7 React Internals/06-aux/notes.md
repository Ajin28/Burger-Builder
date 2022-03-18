Ways to avoid wrapping div for adjavcent elements in react components-

- Returing Array of JSX with unique key attribute

```
  return [
      <p key='i1' onClick={this.props.click}>
        I'm {this.props.name} and I am {this.props.age} years old!
        </p>,
      <p key="i2">{this.props.children}</p>,
      <input
        key="i3"
        type="text"
        onChange={this.props.changed}
        value={this.props.name}
      />
    ]

```

- Creating a Aux(Auxilary Component)/ Higher Order Wrapping Component

```
const Aux = (props) => props.children;
export default Aux;
```

```
    return (
      <Aux>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="i2">{this.props.children}</p>
        <input
          key="i3"
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
```

- On Windows, the Aux.js filename is not allowed in ZIP archives. Hence when extracting the attached source code, you might get prompted to rename the Aux.js file.

- React Fragment (Built in Aux Component)

```
   return (
      <React.Fragment>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="i2">{this.props.children}</p>
        <input key="i3"
          type="text"
          onChange={this.props.changed}
          value={this.props.name} />
      </React.Fragment>
    );
```

```
 return (
      <>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="i2">{this.props.children}</p>
        <input key="i3"
          type="text"
          onChange={this.props.changed}
          value={this.props.name} />
      </>
    );
```
