const content = `
# Class-Based Components

## What Are Class Components?

Class components are **ES6 classes** that extend \`React.Component\`. They were the original way to create components with state and lifecycle methods in React. While functional components with hooks are now preferred, understanding class components is important for working with older codebases.

\`\`\`jsx
import React, { Component } from "react";

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default Greeting;
\`\`\`

Key things to notice:
- The class **extends** \`React.Component\`
- It **must** have a \`render()\` method that returns JSX
- Props are accessed via \`this.props\`

---

## State in Class Components

State is managed through \`this.state\` (an object) and updated with \`this.setState()\`:

\`\`\`jsx
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}
\`\`\`

- **\`this.state\`** holds the initial state
- **\`this.setState\`** updates state and triggers a re-render
- You **never modify** \`this.state\` directly

---

## Lifecycle Methods

Class components have built-in methods that run at specific points in a component's life:

| Stage | Method | Purpose |
|-------|--------|---------|
| Mounting | \`constructor\` | Initialize state |
| Mounting | \`componentDidMount\` | Fetch data, set up timers |
| Updating | \`componentDidUpdate\` | React to state/prop changes |
| Unmounting | \`componentWillUnmount\` | Clean up resources |

### Example: A Live Timer

\`\`\`jsx
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }

  componentDidMount() {
    // Start the timer when component appears
    this.timerID = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    // Clean up when component is removed
    clearInterval(this.timerID);
  }

  render() {
    return <h1>{this.state.time.toLocaleTimeString()}</h1>;
  }
}
\`\`\`

---

## Event Handling

In class components, event handlers need to be bound to \`this\`. The easiest way is using **arrow functions**:

\`\`\`jsx
class ClickHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "Click the button!" };
  }

  // Arrow function auto-binds "this"
  handleClick = () => {
    this.setState({ message: "Button clicked!" });
  };

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}
\`\`\`

---

## Fetching Data

\`\`\`jsx
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => this.setState({ users: data, loading: false }));
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;

    return (
      <ul>
        {this.state.users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }
}
\`\`\`

---

## Class vs Functional Components

| Feature | Class Components | Functional Components |
|---------|-----------------|----------------------|
| Syntax | ES6 class with \`render()\` | Plain function returning JSX |
| State | \`this.state\` + \`this.setState\` | \`useState\` hook |
| Lifecycle | Built-in methods | \`useEffect\` hook |
| Complexity | More verbose | Simpler and shorter |
| Performance | Slightly heavier | More lightweight |

---

## Converting Class to Functional

**Class:**
\`\`\`jsx
class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
\`\`\`

**Functional:**
\`\`\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

Much simpler! No \`this\`, no \`render()\`, no constructor.

---

## When You'll See Class Components

1. **Older codebases** — Many existing projects still use them
2. **Error boundaries** — These still require class components
3. **Third-party libraries** — Some older tutorials and docs use classes

---

## Summary

- Class components use \`extends React.Component\` and require a \`render()\` method
- State is managed with \`this.state\` and \`this.setState()\`
- Lifecycle methods (\`componentDidMount\`, etc.) control behavior at different stages
- **Functional components with hooks** are the modern standard
- Understanding classes helps you work with legacy code and error boundaries
`;

export default content;
