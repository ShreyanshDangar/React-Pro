const content = `
# The useState Hook

## What is useState?

\`useState\` is a React hook that lets you **add state to functional components**. Before hooks existed, only class components could have state. Now, \`useState\` makes functional components just as powerful.

It returns two things:
1. The **current value** of the state
2. A **function** to update that value

\`\`\`jsx
import { useState } from "react";

const [count, setCount] = useState(0);
// count = current value (starts at 0)
// setCount = function to update it
\`\`\`

---

## Basic Example: A Counter

\`\`\`jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

When you click the button:
1. \`setCount\` updates the state to \`count + 1\`
2. React **re-renders** the component with the new value
3. The UI shows the updated count

---

## Toggling a Value

\`\`\`jsx
function ToggleMessage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
      {isVisible && <p>Now you see me!</p>}
    </div>
  );
}
\`\`\`

\`isVisible\` starts as \`false\`. Clicking the button flips it between \`true\` and \`false\`.

---

## Functional Updates (Using Previous State)

When your new state depends on the old state, use the **functional form** of the setter:

\`\`\`jsx
// Instead of this:
setCount(count + 1);

// Do this:
setCount(prevCount => prevCount + 1);
\`\`\`

This is important because state updates are **asynchronous** — React batches them for performance. The functional form always gives you the latest value.

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  const incrementByThree = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // count will increase by 3
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementByThree}>+3</button>
    </div>
  );
}
\`\`\`

---

## State with Objects

You can store objects in state, but you must **never mutate them directly**. Always create a new object:

\`\`\`jsx
function UserProfile() {
  const [user, setUser] = useState({ name: "John", age: 30 });

  const birthday = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
    // Spread the old object, then override the age
  };

  return (
    <div>
      <p>{user.name} is {user.age} years old.</p>
      <button onClick={birthday}>Happy Birthday!</button>
    </div>
  );
}
\`\`\`

The **spread operator** (\`...prev\`) copies all existing properties, then you override just the ones you want to change.

---

## State with Arrays

Same rule — never mutate directly. Use spread or array methods that return new arrays:

\`\`\`jsx
function ShoppingList() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems(prev => [...prev, "New Item"]);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}
\`\`\`

---

## Multiple State Variables

You can use \`useState\` multiple times in one component — each manages its own independent piece of state:

\`\`\`jsx
function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
      <p>Name: {name}, Age: {age}</p>
    </form>
  );
}
\`\`\`

---

## Lazy Initialization

If calculating the initial state is expensive, pass a **function** to \`useState\`. It only runs once:

\`\`\`jsx
const [count, setCount] = useState(() => {
  // This only runs on the first render
  return someExpensiveCalculation();
});
\`\`\`

---

## Common Mistakes

1. **Mutating state directly** — Never do \`state.push()\` or \`state.name = "new"\`. Always create a new value.
2. **Forgetting that updates are async** — The state doesn't change immediately after calling the setter.
3. **Using stale state** — Use the functional update form (\`prev => ...\`) when the new value depends on the old one.

---

## Summary

- \`useState\` adds state to functional components
- It returns \`[value, setValue]\`
- State updates trigger **re-renders**
- Updates are **asynchronous** — use functional form for dependent updates
- Never **mutate** objects or arrays in state — always create new copies
- Use **multiple \`useState\` calls** for independent pieces of state
`;

export default content;
