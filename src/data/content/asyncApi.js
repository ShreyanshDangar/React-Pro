const content = `
# Asynchronous API Calls in React

## What Are Async API Calls?

When your React app needs data from a server (like a list of users, products, or posts), it makes **API calls**. These calls are **asynchronous** — they take time to complete, and your app shouldn't freeze while waiting.

React provides several ways to handle async operations. Let's explore the three main approaches.

---

## Approach 1: Async/Await (Recommended)

The cleanest and most readable approach. Use \`async/await\` inside \`useEffect\`:

\`\`\`jsx
import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

**Key points:**
- \`await\` pauses execution until the Promise resolves
- \`try/catch\` handles errors cleanly
- \`finally\` runs whether the call succeeded or failed
- Define the async function **inside** useEffect, then call it

**Note:** You can't make the \`useEffect\` callback itself async — you need to create an async function inside it.

---

## Approach 2: Promises with .then()

The traditional way using Promise chaining:

\`\`\`jsx
useEffect(() => {
  setLoading(true);

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(err => setError("Failed to fetch"))
    .finally(() => setLoading(false));
}, []);
\`\`\`

Works fine but can get messy with **chained requests** (each \`.then\` adding another level).

---

## Approach 3: Callbacks (Old Way)

Nested callbacks — also known as **"callback hell"**:

\`\`\`jsx
fetch(url1, (err, data1) => {
  if (err) return handleError(err);
  fetch(url2, (err, data2) => {
    if (err) return handleError(err);
    fetch(url3, (err, data3) => {
      // Deep nesting = hard to read
    });
  });
});
\`\`\`

This is the **old way** and should be avoided. Use async/await or Promises instead.

---

## Sequential vs Parallel Requests

### Sequential (one after another):

\`\`\`jsx
const fetchSequential = async () => {
  const users = await fetch("/api/users").then(r => r.json());
  const posts = await fetch("/api/posts").then(r => r.json());
  // posts waits for users to finish
};
\`\`\`

### Parallel (both at once):

\`\`\`jsx
const fetchParallel = async () => {
  const [users, posts] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  // Both requests run simultaneously — faster!
};
\`\`\`

Use \`Promise.all\` when requests don't depend on each other.

---

## The Loading/Error/Data Pattern

Almost every API call follows this pattern:

\`\`\`jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
\`\`\`

Then in your JSX:

\`\`\`jsx
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
return <div>{/* render data */}</div>;
\`\`\`

This is so common that libraries like React Query and RTK Query automate it for you.

---

## Comparison

| Approach | Readability | Error Handling | Best For |
|----------|------------|----------------|----------|
| Async/Await | Excellent | \`try/catch\` | Modern React apps |
| Promises | Good | \`.catch()\` | Simpler chains |
| Callbacks | Poor | Manual checks | Legacy code only |

---

## Summary

- Use **async/await** inside \`useEffect\` for API calls — it's the cleanest approach
- Always handle **loading**, **error**, and **data** states
- Use **\`Promise.all\`** for parallel requests
- Avoid **callback nesting** — use modern async patterns instead
- For complex apps, consider libraries like **RTK Query** or **React Query** that automate caching and refetching
`;

export default content;
