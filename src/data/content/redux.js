const content = `
# Introduction to Redux

## What is Redux?

Redux is a **state management library** for JavaScript apps. It creates a **single, centralized store** that holds all your application's state, making it easier to manage, debug, and share data across components.

Think of it as a **global container** that any component can read from or write to.

---

## Why Use Redux?

### Problems it solves:

1. **Prop Drilling** — No more passing data through 10 levels of components
2. **Shared State** — Multiple components can access the same data easily
3. **Predictability** — State changes happen in a controlled, traceable way
4. **Debugging** — Redux DevTools let you see every state change and even "time travel"

### When to use it:

- Your app has **complex, shared state** across many components
- You need **predictable state updates**
- Multiple components need to **read and write** the same data

For simple apps, React's built-in \`useState\` and Context API are usually enough.

---

## Core Concepts

### 1. Store

The single source of truth — one JavaScript object holding all app state.

### 2. Actions

Plain objects that describe **what happened**:

\`\`\`jsx
const incrementAction = { type: "INCREMENT" };
const addTodoAction = { type: "ADD_TODO", payload: "Learn Redux" };
\`\`\`

### 3. Reducers

Pure functions that decide **how state changes** based on the action:

\`\`\`jsx
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
\`\`\`

### 4. Dispatch

The function that sends actions to the reducer:

\`\`\`jsx
store.dispatch({ type: "INCREMENT" });
\`\`\`

---

## The Redux Flow

\`\`\`
User clicks button
    → dispatch({ type: "INCREMENT" })
    → Reducer receives (currentState, action)
    → Reducer returns new state
    → Store updates
    → Components re-render with new state
\`\`\`

---

## Setting Up Redux in React

### Step 1: Install

\`\`\`bash
npm install redux react-redux
\`\`\`

### Step 2: Create the Store

\`\`\`jsx
import { createStore } from "redux";

const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "DECREMENT": return { count: state.count - 1 };
    default: return state;
  }
};

const store = createStore(counterReducer);
export default store;
\`\`\`

### Step 3: Provide Store to React

\`\`\`jsx
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
\`\`\`

### Step 4: Connect Components

\`\`\`jsx
import { useSelector, useDispatch } from "react-redux";

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </div>
  );
}
\`\`\`

- **\`useSelector\`** — Read values from the store
- **\`useDispatch\`** — Get the dispatch function to send actions

---

## Redux's Three Principles

1. **Single Source of Truth** — All state in one store
2. **State is Read-Only** — Can only change state by dispatching actions
3. **Pure Functions** — Reducers must be pure (no side effects, same input = same output)

---

## Redux vs Context API

| Feature | Redux | Context API |
|---------|-------|-------------|
| Complexity | Higher | Lower |
| Performance | Optimized | May cause extra re-renders |
| DevTools | Yes (time travel!) | No |
| Best For | Large, complex apps | Simple shared state |
| Learning Curve | Steeper | Easier |

---

## Summary

- Redux provides a **centralized store** for app-wide state
- State changes through: **dispatch action → reducer → new state**
- Use **\`useSelector\`** to read state, **\`useDispatch\`** to update it
- Redux is best for **large apps with complex, shared state**
- For modern Redux, use **Redux Toolkit** (covered next) — it simplifies everything
`;

export default content;
