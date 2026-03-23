const content = `
# Handling Events in React

React's event system is similar to HTML events but with a few key differences: event names use **camelCase** (e.g., \`onClick\` instead of \`onclick\`), and you pass **functions** instead of strings.

---

## Common Events

### onClick — Button Clicks

\`\`\`jsx
import { useState } from "react";

const ClickButton = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Clicked {count} times</p>
    </div>
  );
};
\`\`\`

### onChange — Input Changes

\`\`\`jsx
const TextInput = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <p>You typed: {text}</p>
    </div>
  );
};
\`\`\`

\`event.target.value\` gives you whatever the user typed.

### onSubmit — Form Submissions

\`\`\`jsx
const FormSubmit = () => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload
    alert("Submitted: " + name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <button type="submit">Submit</button>
    </form>
  );
};
\`\`\`

**\`event.preventDefault()\`** is crucial — without it, the form would reload the entire page.

---

## Mouse Events

### onMouseEnter and onMouseLeave (Hover)

\`\`\`jsx
const HoverBox = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: 20, background: hovered ? "lightblue" : "lightgray" }}
    >
      {hovered ? "Mouse is over!" : "Hover over me"}
    </div>
  );
};
\`\`\`

---

## Keyboard Events

### onKeyDown and onKeyUp

\`\`\`jsx
const KeyPress = () => {
  const [key, setKey] = useState("");

  return (
    <div>
      <input onKeyDown={(e) => setKey("Pressed: " + e.key)} />
      <p>{key}</p>
    </div>
  );
};
\`\`\`

---

## Synthetic Events

React wraps native browser events in **Synthetic Events** — these ensure consistent behavior across all browsers. You can access the native event with \`event.nativeEvent\` if needed.

Key features:
- **Cross-browser compatibility** — works the same everywhere
- **Event delegation** — React attaches a single listener at the root for performance
- **Event pooling** — React reuses event objects (call \`event.persist()\` if you need the event later)

---

## Preventing Default and Stopping Propagation

\`\`\`jsx
const handleSubmit = (event) => {
  event.preventDefault();     // Stop form from reloading page
  event.stopPropagation();    // Stop event from bubbling to parent elements
};
\`\`\`

---

## Summary

- React events use **camelCase** (\`onClick\`, \`onChange\`, \`onSubmit\`)
- Pass **function references**, not function calls
- Use **\`event.preventDefault()\`** to stop default browser behavior
- **Synthetic Events** ensure cross-browser consistency
- Common events: \`onClick\`, \`onChange\`, \`onSubmit\`, \`onMouseEnter\`, \`onKeyDown\`
`;

export default content;
