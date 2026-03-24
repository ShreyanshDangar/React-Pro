const content = `
# The useContext Hook

## The Problem: Prop Drilling

Imagine you have data in a top-level component that a deeply nested child needs. Without Context, you'd have to pass it through **every component in between** — even if those middle components don't use it:

\`\`\`jsx
function App() {
  const user = { name: "John" };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />; // Parent doesn't use it, just passes it along
}

function Child({ user }) {
  return <h1>{user.name}</h1>; // Only Child needs it
}
\`\`\`

This is called **prop drilling**, and it gets messy with deeply nested components.

---

## The Solution: Context API + useContext

Context lets you share data **directly** with any component in the tree, no matter how deep, without passing props through every level.

### Three Steps:

1. **Create** the context
2. **Provide** the value at the top
3. **Consume** it wherever you need it

\`\`\`jsx
import { createContext, useContext } from "react";

// Step 1: Create Context
const UserContext = createContext();

// Step 2: Provide the value
function App() {
  const user = { name: "John" };

  return (
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  );
}

// Step 3: Consume the value (skip Parent entirely!)
function Child() {
  const user = useContext(UserContext);
  return <h1>{user.name}</h1>;
}
\`\`\`

No prop drilling needed! \`Child\` grabs the value directly.

---

## Practical Example: Theme Switcher

### Create a Theme Provider:

\`\`\`jsx
import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

### Use it in any component:

\`\`\`jsx
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}
\`\`\`

### Wrap your app:

\`\`\`jsx
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
\`\`\`

---

## Common Use Cases

1. **Theme** — Light/dark mode across the app
2. **Authentication** — Logged-in user data and login status
3. **Language** — Multi-language support (i18n)
4. **Global settings** — App-wide configuration

---

## Multiple Contexts

You can nest multiple contexts for different concerns:

\`\`\`jsx
const AuthContext = createContext();
const ThemeContext = createContext();

function App() {
  return (
    <AuthContext.Provider value={{ user: "John" }}>
      <ThemeContext.Provider value="dark">
        <Dashboard />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

function Dashboard() {
  const { user } = useContext(AuthContext);
  const theme = useContext(ThemeContext);

  return <p>{user} is using {theme} mode</p>;
}
\`\`\`

---

## useContext vs Context.Consumer

The older way used \`Context.Consumer\` with a render prop — \`useContext\` is much cleaner:

**Old way:**
\`\`\`jsx
<UserContext.Consumer>
  {value => <h1>{value.name}</h1>}
</UserContext.Consumer>
\`\`\`

**New way (useContext):**
\`\`\`jsx
const value = useContext(UserContext);
return <h1>{value.name}</h1>;
\`\`\`

---

## Best Practices

1. **Use sparingly** — Context is for truly global data (theme, auth, language). Don't use it for everything.
2. **Split contexts** — Create separate contexts for unrelated data to avoid unnecessary re-renders.
3. **Provide defaults** — Give a default value when creating context:
   \`\`\`jsx
   const UserContext = createContext({ name: "Guest" });
   \`\`\`
4. **Separate provider logic** — Put context creation and the Provider in its own file for cleaner code.

---

## Summary

- **Context API** lets you share data without prop drilling
- **\`useContext\`** is the hook to consume context values
- Three steps: \`createContext\` → \`Provider\` → \`useContext\`
- Great for **themes, auth, language**, and other global state
- Keep contexts **focused** — split unrelated data into separate contexts
`;

export default content;
