const content = `
# useMemo and useCallback

## Why Do We Need Them?

Every time a component re-renders, React:
1. **Re-runs all calculations** inside the component
2. **Re-creates all functions** defined inside the component

For most cases this is fine. But for **expensive calculations** or when **passing functions to child components**, this can cause performance problems.

- **\`useMemo\`** — Saves the **result** of a calculation so it's not recalculated unnecessarily
- **\`useCallback\`** — Saves a **function** so it's not recreated unnecessarily

Think of both as "memory" — they remember values/functions between renders.

---

## useMemo: Memoize Values

### How It Works

\`useMemo\` runs a calculation and **caches the result**. It only recalculates when its dependencies change.

\`\`\`jsx
const memoizedValue = useMemo(() => {
  return someExpensiveCalculation();
}, [dependencies]);
\`\`\`

### Example: Expensive Calculation

\`\`\`jsx
import { useState, useMemo } from "react";

function ExpensiveComponent({ number }) {
  const factorial = (n) => {
    console.log("Calculating...");
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  // Only recalculates when "number" changes
  const result = useMemo(() => factorial(number), [number]);

  return <h2>Factorial of {number}: {result}</h2>;
}

function App() {
  const [number, setNumber] = useState(5);
  const [other, setOther] = useState(0);

  return (
    <div>
      <input type="number" value={number} onChange={e => setNumber(Number(e.target.value))} />
      <button onClick={() => setOther(other + 1)}>Re-render ({other})</button>
      <ExpensiveComponent number={number} />
    </div>
  );
}
\`\`\`

Clicking "Re-render" changes \`other\` state, which re-renders the component. But the factorial is **not recalculated** because \`number\` didn't change. Without \`useMemo\`, it would recalculate every time.

---

## useCallback: Memoize Functions

### How It Works

\`useCallback\` returns a **memoized version** of a function. The function reference stays the same between renders unless its dependencies change.

\`\`\`jsx
const memoizedFunction = useCallback(() => {
  // function logic
}, [dependencies]);
\`\`\`

### Why Does This Matter?

When you pass a function as a prop to a child component, React considers it a **new prop** on every render (because the function is recreated). This causes the child to re-render unnecessarily — even if nothing actually changed.

### Example: Preventing Child Re-renders

\`\`\`jsx
import { useState, useCallback, memo } from "react";

// Child wrapped in React.memo — only re-renders if props change
const Child = memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

function App() {
  const [count, setCount] = useState(0);

  // Without useCallback, this function is recreated every render
  // causing Child to re-render even when count changes
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // Empty deps = function never changes

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}
\`\`\`

Without \`useCallback\`, the Child would log "Child rendered" every time you increment. With it, the Child only renders once.

---

## useMemo vs useCallback

| Aspect | useMemo | useCallback |
|--------|---------|-------------|
| What it saves | A **value** (result of calculation) | A **function** |
| Returns | The computed value | The memoized function |
| Use when | You have expensive calculations | You pass functions to child components |

They're actually related:

\`\`\`jsx
// These are equivalent:
useCallback(fn, deps)
useMemo(() => fn, deps)
\`\`\`

---

## When NOT to Use Them

- For **lightweight calculations** — React is fast enough without memoization
- When there are **no child components** that could benefit from stable references
- When you're not sure — **premature optimization** makes code harder to read

**Rule of thumb:** Only use them when you notice a real performance issue, not "just in case."

---

## Summary

- **\`useMemo\`** caches expensive calculation results — only recalculates when dependencies change
- **\`useCallback\`** caches functions — prevents child components from re-rendering unnecessarily
- Both take a **dependency array** that controls when the cached value updates
- Don't overuse them — they add complexity and are only needed for actual performance bottlenecks
`;

export default content;
