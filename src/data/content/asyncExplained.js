const content = `
# How Async JavaScript Works

## JavaScript is Single-Threaded

JavaScript can only do **one thing at a time**. It has a single call stack — meaning it processes one function at a time. So how does it handle things like API calls that take seconds to complete?

The answer: the **Event Loop**.

---

## The Event Loop Explained

The event loop is the mechanism that lets JavaScript handle async operations without blocking. Here's how it works:

### The Players:

1. **Call Stack** — Where functions execute. Functions are pushed on when called, popped off when done.
2. **Web APIs** — Browser-provided features (fetch, setTimeout, DOM events). These run in the background.
3. **Callback Queue** — When an async operation finishes, its callback waits here.
4. **Microtask Queue** — A priority queue for Promise callbacks (runs before the callback queue).
5. **Event Loop** — Continuously checks: "Is the call stack empty? If yes, move the next task from the queue to the stack."

### The Flow:

\`\`\`
1. Code runs on the Call Stack
2. Async operations (fetch, setTimeout) are handed to Web APIs
3. When they finish, callbacks go to the Queue
4. Event Loop moves callbacks to the Call Stack when it's empty
\`\`\`

---

## Callbacks: The Original Way

A callback is a function passed to another function, to be called when the operation completes:

\`\`\`jsx
function fetchData(url, callback) {
  fetch(url)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
}

// Usage
fetchData("/api/users", (error, data) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Data:", data);
  }
});
\`\`\`

### The Problem: Callback Hell

When you need multiple sequential async operations, callbacks nest deeply:

\`\`\`jsx
fetchData(url1, (err, data1) => {
  fetchData(url2, (err, data2) => {
    fetchData(url3, (err, data3) => {
      // This "pyramid of doom" is hard to read and maintain
    });
  });
});
\`\`\`

---

## Promises: A Better Way

A Promise represents a value that will be available **in the future**. It has three states:

- **Pending** — Operation is still running
- **Fulfilled** — Operation completed successfully
- **Rejected** — Operation failed

\`\`\`jsx
fetch("/api/users")
  .then(response => response.json())  // When fulfilled
  .then(data => console.log(data))     // Chain another operation
  .catch(error => console.log(error))  // When rejected
  .finally(() => console.log("Done")); // Always runs
\`\`\`

Promises flatten the nesting:

\`\`\`jsx
fetch(url1)
  .then(res => res.json())
  .then(data1 => fetch(url2))
  .then(res => res.json())
  .then(data2 => fetch(url3))
  .then(res => res.json())
  .then(data3 => console.log("All done!"))
  .catch(err => console.log("Error:", err));
\`\`\`

---

## Async/Await: The Modern Way

\`async/await\` is syntactic sugar over Promises. It makes async code **look synchronous**:

\`\`\`jsx
async function fetchAllData() {
  try {
    const res1 = await fetch(url1);
    const data1 = await res1.json();

    const res2 = await fetch(url2);
    const data2 = await res2.json();

    const res3 = await fetch(url3);
    const data3 = await res3.json();

    console.log("All done!", data1, data2, data3);
  } catch (error) {
    console.log("Error:", error);
  }
}
\`\`\`

- \`async\` marks a function as asynchronous (it returns a Promise)
- \`await\` pauses execution until the Promise resolves
- \`try/catch\` handles errors — just like synchronous code

---

## Microtasks vs Macrotasks

Understanding execution order:

\`\`\`jsx
console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

// Output order:
// 1 - Start
// 4 - End
// 3 - Promise  (microtask - higher priority)
// 2 - Timeout  (macrotask - lower priority)
\`\`\`

Promises (microtasks) always run **before** setTimeout (macrotasks), even with 0 delay.

---

## Comparison

| Feature | Callbacks | Promises | Async/Await |
|---------|-----------|----------|-------------|
| Readability | Poor (nesting) | Good (chaining) | Excellent (linear) |
| Error Handling | Manual checks | \`.catch()\` | \`try/catch\` |
| Nesting | Deep ("callback hell") | Flat chains | Completely flat |
| Best For | Simple, one-time ops | Multiple chains | Modern apps |

---

## Summary

- JavaScript handles async via the **Event Loop**, **Call Stack**, and **Task Queues**
- **Callbacks** are the oldest pattern — simple but lead to nesting
- **Promises** flatten the nesting with \`.then()\` chains
- **Async/Await** makes async code look synchronous — the recommended approach
- **Microtasks** (Promises) have higher priority than **macrotasks** (setTimeout)
- In React, use **async/await inside useEffect** for API calls
`;

export default content;
