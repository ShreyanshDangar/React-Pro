const content = `
# The useEffect Hook

## What is useEffect?

\`useEffect\` lets you perform **side effects** in functional components. Side effects are things that happen "outside" your component — like fetching data from an API, setting up a timer, or changing the page title.

Think of it as telling React: "After you render this component, also do this extra thing."

\`\`\`jsx
import { useEffect } from "react";

useEffect(() => {
  // Side effect code goes here
}, [dependencies]);
\`\`\`

---

## How the Dependency Array Works

The second argument to \`useEffect\` is the **dependency array**. It controls **when** the effect runs:

| Dependency Array | When the Effect Runs |
|---|---|
| \`[]\` (empty) | Only once, after the first render |
| \`[count]\` | After first render + whenever \`count\` changes |
| No array at all | After **every** render |

---

## Example 1: Run Once on Mount

\`\`\`jsx
import { useState, useEffect } from "react";

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array = runs once

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}
\`\`\`

The empty \`[]\` means this effect runs **only once** when the component first appears — like \`componentDidMount\` in class components.

---

## Example 2: Run When a Value Changes

\`\`\`jsx
function DocumentTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \\\`Count: \\\${count}\\\`;
  }, [count]); // Runs whenever count changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

Every time \`count\` changes, the effect runs and updates the browser tab title.

---

## Example 3: Run on Every Render

\`\`\`jsx
useEffect(() => {
  console.log("Component rendered!");
}); // No dependency array at all
\`\`\`

Without a dependency array, the effect runs after **every single render**. This is rarely what you want — usually you should provide dependencies.

---

## Cleanup Function

Sometimes your effect creates something that needs to be **cleaned up** — like a timer or an event listener. Return a **cleanup function** from your effect:

\`\`\`jsx
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // Set up the listener
    window.addEventListener("resize", handleResize);

    // Cleanup: remove the listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array = set up once, clean up on unmount

  return <p>Window width: {width}px</p>;
}
\`\`\`

The cleanup function runs:
- When the component **unmounts** (is removed from the page)
- **Before** the effect runs again (if dependencies changed)

---

## Conditional Effects

You do not usually make an effect "conditional" by skipping the hook itself. Hooks must always run in the same order. Instead, call the hook normally and put the condition **inside** the effect:

\`\`\`jsx
useEffect(() => {
  if (!isLoggedIn) {
    return;
  }

  console.log("User is logged in");
}, [isLoggedIn]);
\`\`\`

This keeps your hook usage valid while still making the effect logic conditional.

---

## Async Work Inside useEffect

The effect callback itself should not be marked \`async\`, because React expects the callback to either return nothing or return a cleanup function.

\`\`\`jsx
useEffect(() => {
  const loadUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  loadUsers();
}, []);
\`\`\`

The common pattern is:
1. Define an async function **inside** the effect
2. Call it right away
3. Handle loading, success, and error states with regular React state

---

## Multiple useEffect Hooks

You can use multiple \`useEffect\` hooks in one component. Each handles a different concern:

\`\`\`jsx
function UserProfile() {
  const [name, setName] = useState("John");
  const [age, setAge] = useState(30);

  useEffect(() => {
    console.log("Name changed:", name);
  }, [name]);

  useEffect(() => {
    console.log("Age changed:", age);
  }, [age]);

  return (
    <div>
      <button onClick={() => setName("Jane")}>Change Name</button>
      <button onClick={() => setAge(age + 1)}>Increase Age</button>
    </div>
  );
}
\`\`\`

Splitting effects by concern makes your code **cleaner and easier to understand**.

---

## Common Mistakes

1. **Missing dependencies** — If your effect uses a variable, include it in the dependency array. Otherwise, you'll work with stale values.
2. **Forgetting cleanup** — If you set up listeners, timers, or subscriptions, always clean them up.
3. **Infinite loops** — If your effect updates state that's also in the dependency array, you'll trigger endless re-renders.

---

## Summary

- \`useEffect\` handles **side effects** (data fetching, timers, DOM changes)
- The **dependency array** controls when the effect runs
- \`[]\` = run once, \`[value]\` = run when value changes, no array = every render
- Return a **cleanup function** to remove listeners, timers, etc.
- Use **multiple effects** for separate concerns
`;

export default content;
