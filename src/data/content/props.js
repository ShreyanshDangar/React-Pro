const content = `
# Understanding Props in React

## What Are Props?

Props (short for "properties") are how you **pass data from a parent component to a child component**. Think of them like function arguments — they let you customize how a component behaves.

\`\`\`jsx
function Parent() {
  return <Child greeting="Hello from Parent!" />;
}

function Child({ greeting }) {
  return <h1>{greeting}</h1>;
}
\`\`\`

Props are **read-only** — a child component cannot modify the props it receives.

---

## Default Props

You can set fallback values when a prop isn't provided:

\`\`\`jsx
function Greeting({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>;
}

// <Greeting /> renders "Hello, Guest!"
// <Greeting name="Alice" /> renders "Hello, Alice!"
\`\`\`

---

## Passing Functions as Props

Props aren't limited to data — you can pass **functions** too. This lets child components communicate back to parents:

\`\`\`jsx
function Parent() {
  const handleClick = () => alert("Button clicked in child!");
  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  return <button onClick={onClick}>Click Me!</button>;
}
\`\`\`

---

## Props for Conditional Rendering

\`\`\`jsx
function User({ loggedIn }) {
  return (
    <div>
      {loggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}
\`\`\`

---

## Children Props

You can pass JSX elements *between* component tags using the special \`children\` prop:

\`\`\`jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h2>Title</h2>
      <p>This is the card content.</p>
    </Card>
  );
}
\`\`\`

Everything between \`<Card>\` and \`</Card>\` becomes \`children\`.

---

## Prop Drilling (and Why It's a Problem)

When you need to pass data through several layers of components, it's called **prop drilling**:

\`\`\`jsx
function Grandparent() {
  const user = { name: "Alice", age: 30 };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />; // Parent doesn't use it, just passes it along
}

function Child({ user }) {
  return <p>{user.name} is {user.age} years old.</p>;
}
\`\`\`

This gets tedious with deeply nested components. The **Context API** (covered later) solves this.

---

## Best Practices

1. **Destructure props** for cleaner code: \`({ name, age })\` instead of \`(props)\`
2. **Keep components reusable** — pass data through props instead of hardcoding
3. **Avoid excessive prop drilling** — use Context API for deeply nested data
4. **Don't overload** a single component with too many props — break it into smaller components

---

## Summary

- Props pass **data and functions** from parent to child
- Props are **read-only** — children can't modify them
- Use **default values** for optional props
- **Children prop** lets you nest content inside components
- **Prop drilling** is a sign you might need Context API
`;

export default content;
