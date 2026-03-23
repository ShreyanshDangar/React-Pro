const content = `
# Rendering Lists with map()

## What is map()?

\`map()\` is a JavaScript array method that creates a **new array** by running a function on each element. In React, it's the standard way to render lists of data.

\`\`\`jsx
const fruits = ["Apple", "Banana", "Cherry"];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
\`\`\`

---

## The key Prop — Why It Matters

Every item in a list needs a unique **\`key\`** prop. This helps React identify which items changed, were added, or removed.

\`\`\`jsx
const users = [
  { id: 1, name: "John", age: 28 },
  { id: 2, name: "Jane", age: 32 },
];

function UserList() {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}
\`\`\`

Best practice: Use a **unique ID** from your data (like \`user.id\`) rather than the array index.

---

## Reusable Components with map()

Create a separate component for each item, then use \`map()\` to render them:

\`\`\`jsx
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
    </div>
  );
}

function ProductList() {
  const products = [
    { id: 1, name: "Laptop", price: "$999" },
    { id: 2, name: "Phone", price: "$499" },
  ];

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
\`\`\`

This keeps your code clean and each component focused on one job.

---

## Nested Data with Nested map()

\`\`\`jsx
const categories = [
  { category: "Electronics", items: ["Laptop", "Phone"] },
  { category: "Books", items: ["React Guide", "JS Handbook"] },
];

function CategoryList() {
  return (
    <div>
      {categories.map((cat, i) => (
        <div key={i}>
          <h2>{cat.category}</h2>
          <ul>
            {cat.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
\`\`\`

---

## Common Mistakes to Avoid

1. **Missing keys** — Always provide a unique \`key\` prop
2. **Using index as key** — Fine for static lists, but problematic if items can be reordered or deleted
3. **Mutating arrays directly** — Use immutable methods like \`filter\`, \`map\`, or spread operator

---

## Summary

- \`map()\` transforms arrays into lists of JSX elements
- Every list item needs a unique **\`key\`** prop for efficient updates
- Extract list items into **reusable components** for clean code
- Nested \`map()\` handles nested data structures
`;

export default content;
