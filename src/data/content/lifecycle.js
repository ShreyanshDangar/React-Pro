const content = `
# React Component Lifecycle

## What is the Lifecycle?

Every React component goes through three phases during its existence:

1. **Mounting** — The component is created and added to the page
2. **Updating** — The component re-renders because state or props changed
3. **Unmounting** — The component is removed from the page

In class components, React provides special **lifecycle methods** for each phase. In functional components, \`useEffect\` handles all of these.

---

## Mounting Phase

When a component first appears on the screen.

### Class Component: \`componentDidMount\`

Runs **once** right after the component is rendered for the first time. Perfect for fetching data or setting up listeners.

\`\`\`jsx
class Example extends React.Component {
  componentDidMount() {
    console.log("Component is now on the page!");
    // Fetch data, set up timers, etc.
  }

  render() {
    return <div>Hello!</div>;
  }
}
\`\`\`

### Functional Equivalent: \`useEffect\` with \`[]\`

\`\`\`jsx
function Example() {
  useEffect(() => {
    console.log("Component is now on the page!");
  }, []); // Empty array = runs once on mount

  return <div>Hello!</div>;
}
\`\`\`

---

## Updating Phase

When state or props change and the component re-renders.

### Class Component: \`componentDidUpdate\`

Runs after **every re-render** (not the first one). You can compare old and new values:

\`\`\`jsx
class Example extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log("Count changed to:", this.state.count);
    }
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}
\`\`\`

### Functional Equivalent: \`useEffect\` with dependencies

\`\`\`jsx
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed to:", count);
  }, [count]); // Runs when count changes

  return <div>{count}</div>;
}
\`\`\`

---

## Unmounting Phase

When the component is removed from the page.

### Class Component: \`componentWillUnmount\`

Runs right **before** the component is destroyed. Use it to clean up timers, listeners, or subscriptions:

\`\`\`jsx
class Timer extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID); // Clean up!
  }

  render() {
    return <div>Timer running...</div>;
  }
}
\`\`\`

### Functional Equivalent: Cleanup function in \`useEffect\`

\`\`\`jsx
function Timer() {
  useEffect(() => {
    const id = setInterval(() => console.log("tick"), 1000);

    return () => {
      clearInterval(id); // Clean up when unmounting
    };
  }, []);

  return <div>Timer running...</div>;
}
\`\`\`

---

## Other Lifecycle Methods

### \`shouldComponentUpdate\`

Controls whether a re-render should happen. Used for **performance optimization**:

\`\`\`jsx
shouldComponentUpdate(nextProps, nextState) {
  return nextState.count !== this.state.count; // Only re-render if count changed
}
\`\`\`

**Functional equivalent:** Use \`React.memo\` to skip re-renders when props haven't changed:

\`\`\`jsx
const Example = React.memo(function Example({ value }) {
  return <div>{value}</div>;
});
\`\`\`

### \`getDerivedStateFromProps\`

A static method that updates state based on prop changes. Rarely needed — usually \`useEffect\` is a better choice.

### \`componentDidCatch\`

Catches errors in child components. Used to create **error boundaries**. No direct hook equivalent yet — you must use a class component for error boundaries.

---

## Lifecycle at a Glance

| Phase | Class Method | Hook Equivalent |
|-------|-------------|-----------------|
| Mount | \`componentDidMount\` | \`useEffect(() => {}, [])\` |
| Update | \`componentDidUpdate\` | \`useEffect(() => {}, [deps])\` |
| Unmount | \`componentWillUnmount\` | \`useEffect\` cleanup function |
| Optimize | \`shouldComponentUpdate\` | \`React.memo\` |
| Errors | \`componentDidCatch\` | No hook equivalent |

---

## Summary

- Components have three lifecycle phases: **mount, update, unmount**
- Class components use dedicated **lifecycle methods** for each phase
- Functional components use **\`useEffect\`** to handle all lifecycle events
- Always **clean up** resources (timers, listeners) when a component unmounts
- \`useEffect\` with different dependency arrays replaces multiple class lifecycle methods
`;

export default content;
