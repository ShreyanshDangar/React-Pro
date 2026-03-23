const content = `
# Conditional Rendering in React

Conditional rendering means showing different UI based on conditions — like showing a "Welcome back" message for logged-in users and a "Please log in" prompt for others.

---

## 1. Using if Statements

The simplest approach — return different JSX based on a condition:

\`\`\`jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please log in.</h1>;
}
\`\`\`

Best for rendering **completely different** blocks of JSX.

---

## 2. Ternary Operator

A concise inline approach for simple conditions:

\`\`\`jsx
function Greeting({ isLoggedIn }) {
  return <h1>{isLoggedIn ? "Welcome back!" : "Please log in."}</h1>;
}
\`\`\`

Great for toggling between two values inline.

---

## 3. Logical AND (&&)

Renders something **only when** a condition is true:

\`\`\`jsx
function Notification({ hasMessages }) {
  return (
    <div>
      {hasMessages && <p>You have unread messages!</p>}
    </div>
  );
}
\`\`\`

If \`hasMessages\` is false, nothing renders. Be careful with numbers — \`0 && <p>Text</p>\` renders \`0\`, not nothing.

---

## 4. Switch Statement

For multiple conditions:

\`\`\`jsx
function StatusMessage({ status }) {
  switch (status) {
    case "loading": return <p>Loading...</p>;
    case "success": return <p>Data loaded!</p>;
    case "error": return <p>Something went wrong.</p>;
    default: return <p>Unknown status.</p>;
  }
}
\`\`\`

---

## 5. Conditional CSS Classes

\`\`\`jsx
function Button({ isPrimary }) {
  return (
    <button className={isPrimary ? "btn-primary" : "btn-secondary"}>
      Click Me
    </button>
  );
}
\`\`\`

---

## 6. Fragments for Grouping

Use fragments (\`<></>\`) to group conditional elements without adding extra DOM nodes:

\`\`\`jsx
function UserActions({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn ? (
        <>
          <button>Logout</button>
          <p>Welcome back!</p>
        </>
      ) : (
        <>
          <button>Login</button>
          <p>Please log in.</p>
        </>
      )}
    </>
  );
}
\`\`\`

---

## Best Practices

1. Use **ternary** for simple inline conditions
2. Use **\`&&\`** when you only need to show or hide one element
3. Use **\`if\` or \`switch\`** for complex multi-branch logic
4. **Avoid nested ternaries** — they become hard to read quickly
5. Extract complex conditions into **helper functions**

---

## Summary

| Method | Best For |
|--------|----------|
| \`if\` statement | Completely different JSX blocks |
| Ternary \`? :\` | Simple inline toggle between two options |
| \`&&\` operator | Show/hide a single element |
| \`switch\` | Multiple distinct conditions |
`;

export default content;
