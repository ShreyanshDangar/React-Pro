const content = `
# Redux API Calls vs useEffect

## The Question

You can fetch data in React using \`useEffect\` + \`fetch\` directly in components. So why use Redux (or RTK Query) for API calls?

The answer depends on your app's size and complexity.

---

## The Problem with useEffect Everywhere

### Duplicate API Calls

If multiple components need the same data, each one makes its own API call:

\`\`\`jsx
// ComponentA fetches users
function ComponentA() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(setUsers);
  }, []);
}

// ComponentB ALSO fetches users — same data, separate call!
function ComponentB() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(setUsers);
  }, []);
}
\`\`\`

**Two components = two identical API calls.** That's wasteful.

### Repeated Loading/Error Logic

Every component needs the same boilerplate:

\`\`\`jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch("/api/data")
    .then(r => r.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
\`\`\`

You write this pattern in every component that fetches data.

---

## How Redux Solves These Problems

### 1. Centralized State

With Redux, data is fetched **once** and stored in a **global store**. Every component reads from the same source:

\`\`\`jsx
// With RTK Query — both components share the same cached data
function ComponentA() {
  const { data: users } = useGetUsersQuery(); // Uses cache
}

function ComponentB() {
  const { data: users } = useGetUsersQuery(); // Same cache, no extra API call
}
\`\`\`

### 2. Automatic Loading and Error States

RTK Query handles it for you:

\`\`\`jsx
const { data, isLoading, error } = useGetUsersQuery();
\`\`\`

No manual \`useState\` for loading or errors.

### 3. Built-in Caching

Redux (especially RTK Query) **caches API responses**. If the data was already fetched, it returns the cached version instantly — no network request needed.

### 4. Automatic Refetching

\`\`\`jsx
// Refetch when user returns to the page
useGetUsersQuery(undefined, { refetchOnMountOrArgChange: true });

// Auto-refresh every 10 seconds
useGetUsersQuery(undefined, { pollingInterval: 10000 });
\`\`\`

### 5. Centralized API Logic

With \`useEffect\`, API logic is **scattered** across many components. With Redux, it's all in one place:

\`\`\`
src/
  api/
    usersApi.js    ← All user-related API calls
    postsApi.js    ← All post-related API calls
\`\`\`

If an API URL changes, you update it in **one file**, not dozens of components.

---

## When useEffect is Fine

\`useEffect\` + \`fetch\` is perfectly good when:

- Only **one component** needs the data
- The data is **not shared** across the app
- You don't need **caching** or **automatic refetching**
- Your app is **small and simple**

---

## When to Use Redux for API Calls

Redux shines when:

- **Multiple components** need the same data
- You want **caching** to avoid duplicate requests
- You need **global loading/error** states
- Your app is **growing in complexity**
- You want **centralized API management**

---

## Comparison

| Feature | useEffect + fetch | Redux (RTK Query) |
|---------|------------------|-------------------|
| Simple one-off fetches | Great | Overkill |
| Shared data across components | Duplicates calls | Centralized + cached |
| Loading/error states | Manual in each component | Automatic |
| Caching | None | Built-in |
| Refetching | Manual | Automatic |
| API logic location | Scattered | Centralized |
| Debugging | Basic | Redux DevTools |

---

## Summary

- **\`useEffect\`** is great for simple, isolated data fetching in small apps
- **Redux (RTK Query)** is better when data is shared, you need caching, or your app is complex
- The main benefits of Redux for API calls: **no duplicates, automatic caching, centralized logic, built-in loading/error states**
- Start with \`useEffect\`, and move to Redux when your app outgrows it
`;

export default content;
