const content = `
# The useRef Hook

## What is useRef?

\`useRef\` creates a **mutable container** that persists across renders without causing re-renders. It's like a box where you can store any value — and changing that value won't make your component re-render.

\`\`\`jsx
import { useRef } from "react";

const myRef = useRef(initialValue);
// Access the stored value: myRef.current
\`\`\`

Two main use cases:
1. **Accessing DOM elements** directly
2. **Storing values** that persist between renders without triggering re-renders

---

## Use Case 1: Accessing the DOM

The most common use of \`useRef\` is to get a **direct reference to a DOM element**.

### Example: Auto-Focus an Input

\`\`\`jsx
import { useRef, useEffect } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focus the input on mount
  }, []);

  return <input ref={inputRef} type="text" placeholder="I'm auto-focused!" />;
}
\`\`\`

How it works:
1. \`useRef(null)\` creates a ref that starts as \`null\`
2. \`ref={inputRef}\` connects it to the DOM element
3. After rendering, \`inputRef.current\` points to the actual \`<input>\` element
4. You can call DOM methods like \`.focus()\` on it

---

## Use Case 2: Storing Mutable Values

\`useRef\` is perfect for values that need to **persist between renders** but **don't affect the UI**.

### Example: Storing a Timer ID

\`\`\`jsx
import { useRef, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const start = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div>
      <h2>Timer: {seconds}s</h2>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
\`\`\`

Why use \`useRef\` instead of \`useState\` for the timer ID?
- Changing \`timerRef.current\` does **not trigger a re-render**
- The timer ID doesn't need to be displayed — it's just internal bookkeeping

---

## Use Case 3: Tracking Render Count

\`\`\`jsx
import { useRef, useState } from "react";

function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current++; // This runs every render

  return (
    <div>
      <p>Count: {count}</p>
      <p>This component rendered {renderCount.current} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

If you used \`useState\` for the render count, updating it would cause another render, which would update the count again — **infinite loop!** With \`useRef\`, no re-render is triggered.

---

## useState vs useRef

| Feature | useState | useRef |
|---------|----------|--------|
| Triggers re-render | Yes | No |
| Best for | Values shown in the UI | Internal values, DOM access |
| How to update | \`setValue(newVal)\` | \`ref.current = newVal\` |

**Simple rule:** If the value affects what's displayed on screen, use \`useState\`. If it's just internal tracking or DOM access, use \`useRef\`.

---

## Common Mistakes

1. **Using \`useRef\` when you need \`useState\`** — If the value needs to update the UI, you must use state
2. **Forgetting to clean up** — If you store timers or listeners in a ref, clean them up in \`useEffect\` cleanup
3. **Reading \`ref.current\` during render** — The ref might not be attached to the DOM yet during the first render

---

## Summary

- \`useRef\` creates a **persistent, mutable container** that doesn't cause re-renders
- Use it to **access DOM elements** directly (\`ref={myRef}\`)
- Use it to **store internal values** like timer IDs, previous values, or render counts
- Access the value with \`ref.current\`
- Unlike state, changing \`ref.current\` does **not** trigger a re-render
`;

export default content;
