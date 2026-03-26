const content = `
# Redux vs LocalStorage vs SessionStorage

## The Big Picture

There are different ways to store data in a web app. Each has its strengths:

- **LocalStorage** — Persists data in the browser (survives page refreshes and tab closes)
- **SessionStorage** — Same as LocalStorage but only lasts until the tab is closed
- **Redux** — Stores data in memory (RAM), lost on refresh, but powerful during the session

They serve **different purposes** and are often used together.

---

## LocalStorage

Stores data as **key-value strings** in the browser. Data persists even after closing and reopening the browser.

\`\`\`jsx
// Save
localStorage.setItem("theme", "dark");

// Read
const theme = localStorage.getItem("theme"); // "dark"

// Remove
localStorage.removeItem("theme");
\`\`\`

### Limitations:
- Only stores **strings** — objects need JSON.stringify/parse
- Does **not trigger React re-renders** — you must update state manually
- **Slow** — reads from disk, blocks the main thread
- **Vulnerable to XSS** — don't store sensitive tokens here

---

## SessionStorage

Same API as LocalStorage, but data is **cleared when the tab closes**:

\`\`\`jsx
sessionStorage.setItem("otp", "123456");
const otp = sessionStorage.getItem("otp");
\`\`\`

Good for temporary data like form progress or one-time codes.

---

## Redux (RTK Query)

Stores data **in memory**. Fast, reactive, and integrated with React's rendering cycle:

\`\`\`jsx
// Data is automatically available and reactive
const { data: user } = useGetUserQuery();
\`\`\`

### Advantages over Storage:
- **Triggers re-renders** automatically when data changes
- **Caching** prevents duplicate API calls
- **Automatic refetching** keeps data fresh
- **No JSON parsing needed** — stores objects directly
- **Redux DevTools** for debugging and time-travel

---

## The Key Differences

| Feature | LocalStorage | SessionStorage | Redux |
|---------|-------------|----------------|-------|
| Persists after refresh | Yes | No (tab close) | No |
| Triggers re-renders | No | No | Yes |
| Auto-refetch data | No | No | Yes |
| Caching | Manual | Manual | Automatic |
| Storage type | Disk (slow) | Disk (slow) | RAM (fast) |
| Size limit | ~5-10 MB | ~5-10 MB | Limited by RAM |
| DevTools | Browser storage tab | Browser storage tab | Redux DevTools |
| Security | XSS vulnerable | XSS vulnerable | In-memory (safer) |

---

## The Big Problem with Storage for API Data

If you store API data in LocalStorage:

1. You must **manually save** it: \`localStorage.setItem("users", JSON.stringify(data))\`
2. You must **manually read** it: \`JSON.parse(localStorage.getItem("users"))\`
3. You must **manually update the UI** when data changes
4. Data gets **stale** — it doesn't refresh automatically
5. If the JSON is corrupted, \`JSON.parse\` can **crash your app**

With Redux, none of this is needed. Data flows automatically.

---

## When to Use Each

| Scenario | Best Choice |
|----------|-------------|
| User preferences (theme, language) | LocalStorage |
| Remember me / stay logged in | LocalStorage (with caution) |
| Form data during a session | SessionStorage |
| One-time codes (OTP) | SessionStorage |
| API data shared across components | Redux |
| Data that needs caching & refetching | Redux (RTK Query) |
| Authentication tokens | Redux + HttpOnly cookies |

---

## Using Them Together

In practice, you often combine all three:

\`\`\`jsx
// Store user preference in LocalStorage
localStorage.setItem("theme", "dark");

// Store session-specific data in SessionStorage
sessionStorage.setItem("currentStep", "3");

// Store API data and app state in Redux
const { data: users } = useGetUsersQuery();
\`\`\`

They're not competing — they solve different problems.

---

## Summary

- **LocalStorage** — For persistent preferences (theme, language). Survives browser restarts.
- **SessionStorage** — For temporary data. Cleared when tab closes.
- **Redux** — For reactive, shared application state. Fast (in-memory), integrates with React rendering, supports caching and auto-refetching.
- Storage **doesn't trigger re-renders** — Redux does
- Storage is **slow (disk)** — Redux is **fast (RAM)**
- For API data in complex apps, **Redux wins**. For simple settings, **LocalStorage is fine**.
`;

export default content;
