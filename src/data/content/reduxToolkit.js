const content = `
# Redux Toolkit (RTK)

## What is Redux Toolkit?

Redux Toolkit is the **official, recommended way** to write Redux. It simplifies Redux by reducing boilerplate, providing helpful utilities, and including built-in support for async operations.

If traditional Redux is like cooking from scratch, Redux Toolkit is like using a recipe kit — same result, way less work.

---

## Why Redux Toolkit?

| Problem with Traditional Redux | RTK Solution |
|-------------------------------|--------------|
| Too much boilerplate | \`createSlice\` auto-generates actions |
| Manual action creators | Actions created automatically |
| Complex store setup | \`configureStore\` handles it |
| No built-in async support | \`createAsyncThunk\` included |

---

## Installation

\`\`\`bash
npm install @reduxjs/toolkit react-redux
\`\`\`

---

## Creating a Slice

A **slice** is a self-contained module with state, reducers, and auto-generated actions:

\`\`\`jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; },
    reset: (state) => { state.count = 0; },
  },
});

// Actions are auto-generated!
export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
\`\`\`

**Notice:** You can "mutate" state directly (\`state.count += 1\`). RTK uses **Immer** internally, which handles immutability for you.

---

## Setting Up the Store

\`\`\`jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
\`\`\`

---

## Providing the Store

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

---

## Using the Store in Components

\`\`\`jsx
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./counterSlice";

function Counter() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
\`\`\`

No manual action creators needed — \`createSlice\` generates them for you!

---

## Async Operations with createAsyncThunk

\`createAsyncThunk\` handles API calls and automatically manages loading, success, and error states:

### Step 1: Create the Thunk

\`\`\`jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
\`\`\`

### Step 2: Use in a Component

\`\`\`jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./usersSlice";

function UserList() {
  const { users, loading, error } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

RTK automatically handles the three states: **pending**, **fulfilled**, and **rejected**.

---

## Traditional Redux vs Redux Toolkit

| Feature | Traditional Redux | Redux Toolkit |
|---------|------------------|---------------|
| Action creators | Write manually | Auto-generated |
| Reducers | Switch statements | \`createSlice\` |
| Immutability | Must handle yourself | Immer built-in |
| Store setup | Manual configuration | \`configureStore\` |
| Async logic | Separate middleware | \`createAsyncThunk\` |
| Code amount | Lots of boilerplate | Minimal |

---

## Summary

- **Redux Toolkit** is the modern, official way to use Redux
- **\`createSlice\`** combines state, reducers, and actions in one place
- **\`configureStore\`** simplifies store setup
- **\`createAsyncThunk\`** handles async operations with automatic loading/error states
- You can "mutate" state directly thanks to **Immer** (it's actually creating immutable updates behind the scenes)
- RTK dramatically **reduces boilerplate** compared to traditional Redux
`;

export default content;
