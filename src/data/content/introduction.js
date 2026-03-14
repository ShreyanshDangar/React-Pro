const content = `
# Introduction to React and Vite

## What is React?

React is a JavaScript **library** created by Facebook for building **user interfaces**. Think of it like building with LEGO blocks — each block is a **component** that represents a piece of your webpage, and you combine them to build the full page.

Before React, developers had to manually update every part of a webpage when data changed. Imagine a social media feed where likes, comments, and new posts appear in real time — updating all of that manually would be a nightmare. React solves this by letting you describe *what* your UI should look like, and it handles all the updates for you.

### Why React was created

Around 2011, Facebook's News Feed became extremely complex — thousands of UI elements, real-time updates everywhere. Manually managing all those DOM updates led to bugs that were hard to find. React introduced two big ideas:

- **Declarative UI**: Instead of giving step-by-step instructions ("find this element, change its text"), you simply say "this is what the screen should look like when the data is X." React figures out the rest.
- **One-way data flow**: Data flows from parent components down to children. This makes the app predictable and easier to debug.

---

## Components — The Building Blocks

A **component** is a JavaScript function that returns JSX (HTML-like code). Each component is like a small, self-contained piece of UI.

\`\`\`jsx
function WelcomeCard() {
  return (
    <div className="card">
      <h1>Hello, React!</h1>
      <p>Welcome to your first component.</p>
    </div>
  );
}
\`\`\`

Components are **reusable** — you can use the same component in multiple places. They can also be **composed** — you can put components inside other components.

---

## JSX: HTML Inside JavaScript

JSX looks like HTML but is actually JavaScript. This code:

\`\`\`jsx
<h1>Hello</h1>
\`\`\`

gets compiled by the build tool into:

\`\`\`js
React.createElement("h1", null, "Hello");
\`\`\`

The beauty of JSX is that you can use full JavaScript logic right inside your markup:

\`\`\`jsx
function Greeting({ isLoggedIn }) {
  return (
    <h1>{isLoggedIn ? "Welcome back!" : "Please log in"}</h1>
  );
}
\`\`\`

---

## Virtual DOM — How React Stays Fast

The browser's real DOM is slow to update. React keeps a **virtual copy** of the DOM in memory. When something changes:

1. React creates a new virtual tree
2. It **compares** the new tree with the old one (called "diffing")
3. It only updates the parts of the real DOM that actually changed

This makes React efficient because it minimizes expensive DOM operations.

---

## Vite — The Modern Build Tool

Vite is a fast build tool that replaced the older Create React App. Here's why it's better:

- **Instant startup** — serves files directly using native ES modules
- **Lightning-fast hot reload** — changes appear almost instantly
- **Minimal configuration** — works great out of the box

### Setting Up a React Project with Vite

\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
\`\`\`

### Project Structure

\`\`\`
my-react-app/
├── public/          # Static files
├── src/
│   ├── App.jsx      # Root component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── package.json
└── vite.config.js
\`\`\`

- **index.html** — The single HTML page React mounts into
- **main.jsx** — Connects React to the browser DOM
- **App.jsx** — Your root component where the app begins

---

## The Mental Shift: HTML → React

In plain HTML, you write static content. In React, UI is **driven by data**:

\`\`\`jsx
function Card({ title }) {
  return (
    <div className="card">
      <h1>{title}</h1>
    </div>
  );
}
\`\`\`

The same component renders different content based on the \`title\` prop. This is the key insight: **React models UI as a function of data.**

---

## Summary

- React is a **UI library** that uses **components** to build interfaces
- **JSX** lets you write HTML-like syntax inside JavaScript
- The **Virtual DOM** makes updates efficient by only changing what's necessary
- **Vite** is the modern, fast build tool for React projects
- React encourages thinking about UI as **data-driven components**
`;

export default content;
