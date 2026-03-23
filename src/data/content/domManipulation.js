const content = `
# DOM Manipulation in React

## How React Handles the DOM Differently

In traditional web development, you directly manipulate the DOM using methods like \`document.getElementById\` or \`querySelector\`. In React, you **never touch the DOM directly**. Instead, you update **state**, and React automatically updates the DOM for you.

Think of it like this: in traditional JS, you're the painter directly painting on the canvas. In React, you describe what the painting should look like, and React paints it for you.

---

## Virtual DOM vs Real DOM

### Real DOM
- The actual page structure in the browser
- Updating it directly is **expensive** (slow)
- Every change can trigger layout recalculations and repaints

### Virtual DOM
React keeps a lightweight **virtual copy** of the DOM in memory. When something changes:

1. **State changes** → React creates a new virtual DOM tree
2. **Diffing** → React compares old vs new virtual trees
3. **Minimal updates** → Only the changed parts are applied to the real DOM

\`\`\`jsx
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

When you click the button:
1. \`setCount\` updates the state
2. React re-renders the component with the new count
3. React compares the virtual DOMs and only updates the \`<p>\` tag's text — the button stays untouched

---

## Multiple Events Changing the DOM

\`\`\`jsx
const EventDemo = () => {
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState("white");

  return (
    <div
      style={{ backgroundColor: bgColor, padding: 20 }}
      onMouseEnter={() => setBgColor("lightblue")}
      onMouseLeave={() => setBgColor("white")}
    >
      <button onClick={() => setMessage("Clicked!")}>Click me</button>
      <p>{message}</p>
    </div>
  );
};
\`\`\`

Each event changes a different piece of state, and React efficiently updates only the affected DOM elements.

---

## Why React's Approach is Better

1. **Batch Updates** — React groups multiple state changes and applies them in one go
2. **Minimal Repaints** — Only changed elements are updated, reducing browser work
3. **Predictable** — You always know what the UI looks like for a given state

---

## Reconciliation and Keys

When React compares the old and new virtual DOM trees, it follows **reconciliation rules** to decide what can stay and what must change. This matters most when rendering lists:

- A stable **key** tells React which item is which between renders
- If keys change unnecessarily, React may throw away existing elements and recreate them
- Good keys improve both correctness and performance

That is why \`array.map()\` examples in React almost always include a unique \`key\` prop.

---

## When Direct DOM Access Is Okay

Saying "never touch the DOM directly" is a useful beginner rule, but the more accurate rule is this:

- **Prefer state-driven rendering** for UI changes
- Use **\`useRef\`** when you need to focus an input, scroll to an element, measure layout, or integrate with a non-React library

\`\`\`jsx
function SearchBox() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        Focus input
      </button>
    </>
  );
}
\`\`\`

The key idea is that React should still remain the **source of truth** for the UI, even when a ref gives you controlled access to a real DOM node.

---

## Summary

- React uses a **Virtual DOM** to minimize expensive real DOM operations
- You update **state**, and React handles DOM updates automatically
- The **diffing algorithm** finds the smallest set of changes needed
- This approach is **faster** and more **predictable** than manual DOM manipulation
`;

export default content;
