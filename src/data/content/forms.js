const content = `
# Forms and Controlled Components

## What Are Controlled Components?

A **controlled component** is an input element whose value is managed by React's state. Instead of the browser controlling the input's value, React does.

\`\`\`jsx
import { useState } from "react";

const MyForm = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>You typed: {inputValue}</p>
    </div>
  );
};
\`\`\`

Here's what makes it "controlled":
- The \`value\` of the input is set to the state variable \`inputValue\`
- When you type, \`onChange\` fires and updates the state
- The input always reflects what's in state — React is in full control

---

## Handling Form Submission

\`\`\`jsx
const SubmitForm = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      <button type="submit">Submit</button>
      {submitted && <p>Submitted: {submitted}</p>}
    </form>
  );
};
\`\`\`

Always call \`event.preventDefault()\` to stop the page from reloading.

---

## Multiple Inputs with One Handler

Instead of creating separate state variables for each input, use a **single object**:

\`\`\`jsx
const MultiForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <p>{JSON.stringify(formData)}</p>
    </form>
  );
};
\`\`\`

The \`name\` attribute on each input tells the handler which field to update. The spread operator \`...prev\` copies existing data and only updates the changed field.

---

## Checkboxes and Radio Buttons

\`\`\`jsx
const CheckboxForm = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <label>
      <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
      I accept the terms
      <p>{accepted ? "Accepted" : "Not accepted"}</p>
    </label>
  );
};
\`\`\`

For checkboxes, use \`checked\` and \`e.target.checked\` instead of \`value\`.

---

## Textareas and Select Elements

React controls \`<textarea>\` and \`<select>\` the same way it controls text inputs: their current value lives in state.

\`\`\`jsx
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    bio: "",
    role: "developer",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <textarea name="bio" value={formData.bio} onChange={handleChange} />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
      </select>
    </>
  );
};
\`\`\`

The pattern is the same:
- State holds the value
- \`value\` (or \`checked\`) reads from state
- \`onChange\` writes back to state

---

## Controlled vs Uncontrolled

Most React forms use **controlled components** because validation, conditional UI, and submission logic become easier to reason about. But React also supports **uncontrolled components**, where the browser keeps the current value and you read it later with a ref.

Use controlled inputs when:
- The UI depends on the current value
- You need live validation
- You want React to remain the single source of truth

Use uncontrolled inputs sparingly, usually for simpler forms or third-party integrations.

---

## Simple Form Validation

\`\`\`jsx
const ValidatedForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError("Name is required!");
    } else {
      setError("");
      alert("Form submitted: " + name);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};
\`\`\`

---

## Summary

- **Controlled components** have their values managed by React state
- Use \`onChange\` to update state on every keystroke
- Handle multiple inputs with a **single state object** and dynamic keys
- Always \`preventDefault()\` on form submission
- Validation is just conditional logic based on state values
`;

export default content;
