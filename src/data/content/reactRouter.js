const content = `
# React Router DOM

## What is React Router?

React Router DOM is a library that enables **client-side routing** in React apps. It lets you create a multi-page experience in a **single-page application (SPA)** — navigating between pages without reloading the browser.

\`\`\`bash
npm install react-router-dom
\`\`\`

---

## Setting Up the Router

Wrap your entire app with \`BrowserRouter\` to enable routing:

\`\`\`jsx
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* Your routes go here */}
    </BrowserRouter>
  );
}
\`\`\`

\`BrowserRouter\` uses clean URLs like \`/about\`. There's also \`HashRouter\` which uses \`#/about\` — but \`BrowserRouter\` is the standard.

---

## Defining Routes

Use \`Routes\` and \`Route\` to map URLs to components:

\`\`\`jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

When the URL is \`/about\`, React renders the \`<About />\` component.

---

## Navigation with Link and NavLink

Use \`Link\` instead of \`<a>\` tags — it navigates without reloading the page:

\`\`\`jsx
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
        Contact
      </NavLink>
    </nav>
  );
}
\`\`\`

- **\`Link\`** — Basic navigation link
- **\`NavLink\`** — Same as Link but knows when it's active (great for styling the current page)

---

## Dynamic Route Parameters

Capture dynamic values from the URL using \`:param\`:

\`\`\`jsx
import { useParams } from "react-router-dom";

// Route definition
<Route path="/user/:id" element={<UserProfile />} />

// Component
function UserProfile() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}

// /user/42 → shows "User ID: 42"
\`\`\`

---

## Nested Routes

Create parent-child route relationships:

\`\`\`jsx
import { Outlet } from "react-router-dom";

// Routes
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>

// Dashboard component uses Outlet to render child routes
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet /> {/* Child route renders here */}
    </div>
  );
}
\`\`\`

\`Outlet\` is a placeholder where the matched child route will render.

---

## Programmatic Navigation

Navigate in code (after a form submission, login, etc.) using \`useNavigate\`:

\`\`\`jsx
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // ... login logic
    navigate("/dashboard"); // Redirect after login
  };

  return <button onClick={handleLogin}>Log In</button>;
}
\`\`\`

---

## Protected Routes

Redirect users who aren't authenticated:

\`\`\`jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute isLoggedIn={isLoggedIn}>
    <Dashboard />
  </ProtectedRoute>
} />
\`\`\`

---

## Key Hooks Summary

| Hook | Purpose |
|------|---------|
| \`useParams\` | Get dynamic URL parameters |
| \`useNavigate\` | Navigate programmatically |
| \`useLocation\` | Get current URL info |
| \`useSearchParams\` | Read/write query strings (\`?key=value\`) |

---

## Summary

- React Router enables **client-side routing** without page reloads
- \`BrowserRouter\` wraps your app, \`Routes\` + \`Route\` define paths
- Use **\`Link\`** / **\`NavLink\`** for navigation (not \`<a>\` tags)
- **Dynamic params** with \`:param\` and \`useParams\`
- **Nested routes** with \`Outlet\` for layout-based routing
- **\`useNavigate\`** for programmatic navigation
- **\`Navigate\`** component for redirects and protected routes
`;

export default content;
