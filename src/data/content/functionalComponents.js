const content = `
# Functional Components

## What Are Functional Components?

Functional components are **plain JavaScript functions** that return JSX. They are the modern, preferred way to build React components. With hooks, they can do everything class components can — and more.

\`\`\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Greeting;
\`\`\`

That's it! No class, no \`render()\` method, no \`this\`. Just a function that takes props and returns UI.

---

## Why Functional Components?

- **Simpler** — Less boilerplate, easier to read and write
- **Hooks** — Can manage state, side effects, and more with hooks
- **Lighter** — No class overhead, better performance
- **Easier to test** — Plain functions are simpler to test

---

## With and Without Props

### With Props:
\`\`\`jsx
function ProfileCard({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}

// Usage: <ProfileCard name="John" age={30} />
\`\`\`

### Without Props:
\`\`\`jsx
function Welcome() {
  return <h1>Welcome to React!</h1>;
}
\`\`\`

---

## Adding State with useState

Functional components use the \`useState\` hook for state management:

\`\`\`jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
\`\`\`

---

## Side Effects with useEffect

The \`useEffect\` hook replaces lifecycle methods:

\`\`\`jsx
import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // Runs once on mount

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

---

## Event Handling

No need for \`this\` binding — just declare functions inside your component:

\`\`\`jsx
function ClickHandler() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
}
\`\`\`

---

## Passing Functions as Props

Parent components can pass callback functions to children:

\`\`\`jsx
function Child({ onButtonClick }) {
  return <button onClick={onButtonClick}>Click Me</button>;
}

function Parent() {
  const handleClick = () => alert("Clicked in child!");
  return <Child onButtonClick={handleClick} />;
}
\`\`\`

---

## Reusable List Components

\`\`\`jsx
function Item({ value }) {
  return <li>{value}</li>;
}

function ItemList() {
  const items = ["React", "JavaScript", "CSS"];

  return (
    <ul>
      {items.map((item, index) => (
        <Item key={index} value={item} />
      ))}
    </ul>
  );
}
\`\`\`

---

## Performance with React.memo

\`React.memo\` prevents unnecessary re-renders by memoizing the component. It only re-renders when its **props actually change**:

\`\`\`jsx
import { memo } from "react";

const Message = memo(function Message({ text }) {
  console.log("Rendering Message...");
  return <h1>{text}</h1>;
});
\`\`\`

If \`text\` doesn't change, the component won't re-render — even if the parent does.

---

## Functional vs Class Components

| Feature | Functional | Class |
|---------|-----------|-------|
| Syntax | Function returning JSX | Class with \`render()\` |
| State | \`useState\` hook | \`this.state\` |
| Lifecycle | \`useEffect\` hook | Lifecycle methods |
| Performance | Lightweight | Heavier |
| Learning Curve | Easier | More complex |

---

## Summary

- Functional components are **plain functions** that return JSX
- They use **hooks** (\`useState\`, \`useEffect\`, etc.) for state and side effects
- No \`this\` keyword needed — simpler and cleaner
- **\`React.memo\`** can optimize performance by preventing unnecessary re-renders
- They are the **standard** for modern React development
`;

export default content;
