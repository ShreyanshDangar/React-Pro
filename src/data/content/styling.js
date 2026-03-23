const content = `
# Inline Styles and className in React

## Part 1: Inline Styles

In HTML, you write styles as a string: \`style="color: red; font-size: 16px;"\`. In React, styles are written as a **JavaScript object** with **camelCase** property names.

### HTML vs React Styles

**HTML:**
\`\`\`html
<div style="color: red; font-size: 16px;">Hello!</div>
\`\`\`

**React:**
\`\`\`jsx
<div style={{ color: "red", fontSize: 16 }}>Hello!</div>
\`\`\`

Notice the differences:
- Double curly braces \`{{ }}\` — the outer braces mean "JavaScript expression," the inner braces create the object
- **camelCase** — \`font-size\` becomes \`fontSize\`
- Numbers default to pixels — \`16\` means \`"16px"\`

### Dynamic Styles

The real power of React inline styles is that they can change based on data:

\`\`\`jsx
function DynamicButton({ isActive }) {
  const buttonStyle = {
    backgroundColor: isActive ? "green" : "gray",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: isActive ? "pointer" : "not-allowed",
  };

  return <button style={buttonStyle}>{isActive ? "Active" : "Inactive"}</button>;
}
\`\`\`

The button automatically changes color and cursor based on whether \`isActive\` is true or false.

---

## Part 2: className (Not class)

In HTML, you use \`class\` to assign CSS classes. In React, you use **\`className\`** instead. Why? Because \`class\` is a reserved word in JavaScript (it's used for ES6 classes), and JSX compiles to JavaScript.

**HTML:**
\`\`\`html
<div class="container">Content</div>
\`\`\`

**React:**
\`\`\`jsx
<div className="container">Content</div>
\`\`\`

### Dynamic Classes

You can change class names based on conditions:

\`\`\`jsx
function DynamicClass({ isActive }) {
  const className = isActive ? "active" : "inactive";
  return <div className={className}>Dynamic Class Example</div>;
}
\`\`\`

### Multiple Classes with Template Literals

\`\`\`jsx
function MultipleClasses({ isPrimary, isDisabled }) {
  return (
    <button className={\`btn \${isPrimary ? "primary" : ""} \${isDisabled ? "disabled" : ""}\`}>
      Submit
    </button>
  );
}
\`\`\`

---

## Best Practices

1. **Use inline styles sparingly** — for dynamic, component-specific styles. For shared styles, use CSS files
2. **Use className for reusable styles** — CSS classes are better for styles shared across components
3. **Keep styles organized** — extract complex style objects into variables

## Quick Comparison

| Feature | HTML | React |
|---------|------|-------|
| Style syntax | \`style="key: value;"\` | \`style={{ key: "value" }}\` |
| Property names | kebab-case (\`font-size\`) | camelCase (\`fontSize\`) |
| Class attribute | \`class\` | \`className\` |
| Dynamic styling | Requires JS DOM manipulation | Built-in with expressions |

---

## Summary

- React inline styles use **JavaScript objects** with **camelCase** properties
- Use \`className\` instead of \`class\` because \`class\` is a JavaScript reserved word
- React makes **dynamic styling** easy with expressions and ternary operators
`;

export default content;
