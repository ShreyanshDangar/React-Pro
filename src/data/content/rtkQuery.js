const content = `
# RTK Query

## What is RTK Query?

RTK Query is a **data-fetching and caching tool** built into Redux Toolkit. It completely automates API calls, caching, loading states, and refetching — so you don't have to write all that boilerplate yourself.

Before RTK Query, you had to manually handle:
- Fetch calls
- Loading states
- Error states
- Caching
- Refetching

RTK Query does **all of this automatically**.

---

## Getting Started

### Step 1: Create an API Slice

\`\`\`jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

// Auto-generated hook!
export const { useGetUsersQuery } = usersApi;
\`\`\`

### Step 2: Add to Store

\`\`\`jsx
import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(usersApi.middleware),
});

export default store;
\`\`\`

### Step 3: Use in a Component

\`\`\`jsx
import { useGetUsersQuery } from "./usersApi";

function UserList() {
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users!</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

That's it! No \`useState\`, no \`useEffect\`, no manual loading/error handling. RTK Query does everything.

---

## Fetching with Parameters

\`\`\`jsx
// In the API slice:
getUserById: builder.query({
  query: (id) => \\\`/users/\\\${id}\\\`,
})

// In a component:
const { data: user } = useGetUserByIdQuery(5);
\`\`\`

---

## Mutations (POST, PUT, DELETE)

For **creating, updating, or deleting** data:

\`\`\`jsx
// In the API slice:
endpoints: (builder) => ({
  getUsers: builder.query({ query: () => "/users" }),
  addUser: builder.mutation({
    query: (newUser) => ({
      url: "/users",
      method: "POST",
      body: newUser,
    }),
  }),
})

// Auto-generated hook:
export const { useGetUsersQuery, useAddUserMutation } = usersApi;
\`\`\`

### Using a mutation:

\`\`\`jsx
function AddUser() {
  const [addUser] = useAddUserMutation();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Add User</button>
    </form>
  );
}
\`\`\`

---

## Automatic Caching

RTK Query **caches** results. If two components use the same query, only **one API call** is made. The second component uses the cached data.

---

## Cache Invalidation

When you add/update/delete data, you want the list to refresh. Use **tags**:

\`\`\`jsx
endpoints: (builder) => ({
  getUsers: builder.query({
    query: () => "/users",
    providesTags: ["Users"],  // This query provides "Users" data
  }),
  addUser: builder.mutation({
    query: (newUser) => ({ url: "/users", method: "POST", body: newUser }),
    invalidatesTags: ["Users"],  // After adding, refetch "Users"
  }),
})
\`\`\`

After \`addUser\` runs, RTK Query automatically refetches \`getUsers\`.

---

## Polling (Auto-Refresh)

Automatically refetch data at intervals:

\`\`\`jsx
const { data } = useGetUsersQuery(undefined, {
  pollingInterval: 5000, // Refetch every 5 seconds
});
\`\`\`

---

## RTK Query vs Manual Fetching

| Feature | Manual (useEffect + fetch) | RTK Query |
|---------|---------------------------|-----------|
| Loading state | Manual \`useState\` | Automatic |
| Error handling | Manual \`try/catch\` | Automatic |
| Caching | None | Built-in |
| Refetching | Manual | Automatic |
| Duplicate requests | Yes | Prevented |
| Code amount | Lots | Minimal |

---

## Summary

- RTK Query **automates** API calls, caching, and state management
- \`builder.query\` for GET requests, \`builder.mutation\` for POST/PUT/DELETE
- Auto-generated hooks (\`useGetUsersQuery\`, \`useAddUserMutation\`)
- **Automatic caching** prevents duplicate API calls
- **Tag-based invalidation** automatically refetches stale data
- **Polling** for real-time data updates
- Dramatically reduces the code needed for API interactions
`;

export default content;
