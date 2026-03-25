const content = `
# The useReducer Hook

## What is useReducer?

\`useReducer\` is an alternative to \`useState\` for managing **complex state logic**. Instead of directly setting state, you **dispatch actions** that describe what happened, and a **reducer function** decides how the state should change.

\`\`\`jsx
const [state, dispatch] = useReducer(reducer, initialState);
\`\`\`

- **\`reducer\`** — A function that takes current state + action, and returns new state
- **\`initialState\`** — The starting value
- **\`state\`** — Current state value
- **\`dispatch\`** — Function to send actions to the reducer

---

## When to Use useReducer vs useState

| Situation | Use |
|-----------|-----|
| Simple state (toggle, counter) | \`useState\` |
| Multiple related state values | \`useReducer\` |
| Complex state transitions | \`useReducer\` |
| State depends on previous state | Either works, \`useReducer\` is cleaner |

---

## Basic Example: Counter

\`\`\`jsx
import { useReducer } from "react";

// The reducer function
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
\`\`\`

How it works:
1. Clicking "+" dispatches \`{ type: "increment" }\`
2. The reducer receives the current state and the action
3. It matches the action type and returns the new state
4. React re-renders with the updated state

---

## Advanced Example: To-Do List

\`useReducer\` really shines with more complex state:

\`\`\`jsx
import { useReducer, useState } from "react";

function todoReducer(todos, action) {
  switch (action.type) {
    case "add":
      return [...todos, { id: Date.now(), text: action.text, done: false }];
    case "toggle":
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "delete":
      return todos.filter(todo => todo.id !== action.id);
    default:
      throw new Error("Unknown action");
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim()) {
      dispatch({ type: "add", text: task });
      setTask("");
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="New task" />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.text}
            <button onClick={() => dispatch({ type: "toggle", id: todo.id })}>
              {todo.done ? "Undo" : "Done"}
            </button>
            <button onClick={() => dispatch({ type: "delete", id: todo.id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

The reducer handles three different actions (\`add\`, \`toggle\`, \`delete\`), keeping all the state logic in one place.

---

## How the Reducer Pattern Works

Think of it like a restaurant:
- **You (component)** — Tell the waiter what you want (dispatch an action)
- **Waiter (dispatch)** — Delivers your order to the kitchen
- **Kitchen (reducer)** — Reads the order and prepares the food (new state)
- **Food (state)** — What comes back to you

The key idea: **you don't cook the food yourself**. You just say what you want, and the reducer handles the rest.

---

## Actions Can Carry Data

Actions aren't just a \`type\` — they can include extra data (called **payload**):

\`\`\`jsx
dispatch({ type: "add", text: "Learn React" });
dispatch({ type: "toggle", id: 42 });
dispatch({ type: "set_filter", filter: "completed" });
\`\`\`

The reducer uses this data to know exactly how to update state.

---

## Key Rules for Reducers

1. **Pure functions** — Given the same state and action, always return the same result
2. **No side effects** — Don't fetch data or set timers inside the reducer. Use \`useEffect\` for that.
3. **Return new state** — Never mutate the existing state. Always return a new object/array.

---

## Summary

- \`useReducer\` manages complex state with a **reducer function** and **actions**
- Better than \`useState\` for state with **multiple sub-values** or **complex transitions**
- Pattern: \`dispatch(action)\` → \`reducer(state, action)\` → new state
- Keep reducers **pure** — no side effects, always return new state
- Actions describe **what happened**, the reducer decides **how state changes**
`;

export default content;
