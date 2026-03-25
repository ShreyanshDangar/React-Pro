const content = `
# Custom Hooks

## What Are Custom Hooks?

A custom hook is a **JavaScript function** that uses React hooks (\`useState\`, \`useEffect\`, etc.) to package up reusable logic. Instead of copying the same stateful logic across multiple components, you extract it into a custom hook and reuse it anywhere.

Custom hooks must start with the word **\`use\`** — like \`useFetch\`, \`useForm\`, or \`useLocalStorage\`.

\`\`\`jsx
function useCustomHook() {
  // Uses React hooks inside
  // Returns values/functions for components to use
}
\`\`\`

---

## Why Use Custom Hooks?

1. **Reusability** — Share logic across multiple components without duplicating code
2. **Clean components** — Move complex logic out of components, keeping them focused on UI
3. **Separation of concerns** — Business logic lives in hooks, rendering logic lives in components

---

## Example 1: useFetch — Reusable Data Fetching

Instead of writing fetch logic in every component:

\`\`\`jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
\`\`\`

### Using it in any component:

\`\`\`jsx
function UserList() {
  const { data, loading, error } = useFetch("https://api.example.com/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

Now any component can fetch data with just one line!

---

## Example 2: useForm — Reusable Form Handling

\`\`\`jsx
import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setValues(initialValues);

  return { values, handleChange, resetForm };
}

export default useForm;
\`\`\`

### Using it:

\`\`\`jsx
function LoginForm() {
  const { values, handleChange, resetForm } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Logging in as " + values.username);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={values.username} onChange={handleChange} />
      <input name="password" type="password" value={values.password} onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}
\`\`\`

The form handling logic is completely reusable across any form in your app.

---

## Custom Hooks vs Regular Functions

| Feature | Regular Function | Custom Hook |
|---------|-----------------|-------------|
| Can use \`useState\` | No | Yes |
| Can use \`useEffect\` | No | Yes |
| Manages state | No | Yes |
| Naming rule | Any name | Must start with \`use\` |

Regular functions can't use hooks — custom hooks can because they follow React's hook rules.

---

## Rules for Custom Hooks

1. **Name must start with \`use\`** — This tells React it's a hook and should follow hook rules
2. **Can use other hooks** — \`useState\`, \`useEffect\`, \`useContext\`, even other custom hooks
3. **Don't call conditionally** — Like all hooks, call them at the top level of your component
4. **Return what's needed** — Return values, functions, or objects that your components will use

---

## When to Create a Custom Hook

- When you find **the same logic in two or more components**
- When a component has **too much logic** mixed with UI code
- When you want to **test logic separately** from the UI
- When dealing with **common patterns** like fetching, forms, or local storage

---

## Summary

- Custom hooks are **functions that use React hooks** to encapsulate reusable logic
- They must start with **\`use\`**
- They keep components **clean** by moving logic out
- Great for **data fetching, form handling, timers**, and any shared stateful logic
- They **don't render anything** — they just return data and functions
`;

export default content;
