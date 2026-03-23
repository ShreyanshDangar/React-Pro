const content = `
# Functions in React

## What Are Function Components?

In React, a **function component** is simply a JavaScript function that returns JSX. It's the modern, preferred way to create components.

\`\`\`jsx
const Welcome = () => {
  return <h1>Hello, Welcome to React!</h1>;
};

export default Welcome;
\`\`\`

That's it — a function that returns some JSX. React renders whatever the function returns onto the screen.

---

## Handling Events with Functions

Functions are essential for responding to user actions like button clicks, typing, or form submissions. React uses special props like \`onClick\`, \`onChange\`, etc.

\`\`\`jsx
import { useState } from "react";

const ClickCounter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p>You clicked {count} times</p>
    </div>
  );
};
\`\`\`

Key points:
- \`handleClick\` is a regular function — it runs when the button is clicked
- \`onClick={handleClick}\` — notice we pass the function **reference** (no parentheses), not the function **call**
- \`useState\` manages the click count (we'll learn more about this in the Hooks section)

---

## Passing Data with Props

**Props** let you pass data from a parent component to a child component, making components dynamic and reusable:

\`\`\`jsx
const App = () => {
  return <Greeting name="John" />;
};

const Greeting = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};
\`\`\`

The parent (\`App\`) passes \`name="John"\` to the child (\`Greeting\`), which uses it to display a personalized message. You can also **destructure** props for cleaner code: \`({ name })\` instead of \`(props)\`.

---

## Dynamic Rendering with Functions

Functions let you render different content based on conditions:

\`\`\`jsx
import { useState } from "react";

const DisplayMessage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Log out" : "Log in"}
      </button>
      <p>{isLoggedIn ? "Welcome back!" : "Please log in."}</p>
    </div>
  );
};
\`\`\`

The button text and message change based on the \`isLoggedIn\` state. This is called **conditional rendering**.

---

## Arrow Functions for Event Handlers

Arrow functions are commonly used for event handlers because they're concise and automatically handle the \`this\` context:

\`\`\`jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increase</button>
    </div>
  );
};
\`\`\`

---

## Summary

1. **Function components** return JSX and are the modern way to build React UI
2. Functions handle **events** like clicks and form submissions
3. **Props** pass data from parent to child, making components reusable
4. **Conditional rendering** uses functions to decide what to display
5. **Arrow functions** are preferred for clean, concise event handlers
`;

export default content;
