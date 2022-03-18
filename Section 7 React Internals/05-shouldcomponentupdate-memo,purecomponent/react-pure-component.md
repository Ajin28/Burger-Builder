# React.PureComponent

React.PureComponent is similar to React.Component. The difference between them is that React.Component doesn’t implement shouldComponentUpdate(), but React.PureComponent implements it with a shallow prop and state comparison.

If your React component’s render() function renders the same result given the same props and state, you can use React.PureComponent for a performance boost in some cases.

- React.PureComponent’s shouldComponentUpdate() only shallowly compares the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only extend PureComponent when you expect to have simple props and state, or use forceUpdate() when you know deep data structures have changed. Or, consider using immutable objects to facilitate fast comparisons of nested data.

- Furthermore, React.PureComponent’s shouldComponentUpdate() skips prop updates for the whole component subtree. Make sure all the children components are also “pure”.
