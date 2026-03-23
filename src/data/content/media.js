const content = `
# Handling Images and Videos in React

## Using Local Images

In plain HTML, you reference images directly: \`<img src="./photo.jpg" />\`. In React, you need to **import** local images because the build tool (Vite/Webpack) processes and optimizes them.

\`\`\`jsx
import photo from "./assets/photo.jpg";

function App() {
  return <img src={photo} alt="Sample Photo" />;
}
\`\`\`

Why import? React replaces the file path with an optimized URL during the build process, preventing broken links in production.

### The Public Folder Alternative

Files placed in the \`public\` folder can be accessed directly without importing:

\`\`\`jsx
function App() {
  return <img src="/images/photo.jpg" alt="Sample Photo" />;
}
\`\`\`

However, public folder assets **aren't optimized** by the build tool. Use this only for assets like favicons or files that rarely change.

---

## Loading Media via URLs

Using external URLs works the same as in HTML:

\`\`\`jsx
function MediaExample() {
  return (
    <div>
      <img src="https://example.com/photo.jpg" alt="Online Photo" />
      <video src="https://example.com/video.mp4" controls />
    </div>
  );
}
\`\`\`

### Dynamic URLs with Props

React makes it easy to load different media based on data:

\`\`\`jsx
function DynamicImage({ imageUrl }) {
  return <img src={imageUrl} alt="Dynamic" />;
}

// Usage
<DynamicImage imageUrl="https://example.com/photo.jpg" />
\`\`\`

---

## Dynamic Media with State

You can change images based on user interactions:

\`\`\`jsx
import { useState } from "react";
import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";

function ToggleImage() {
  const [isFirst, setIsFirst] = useState(true);

  return (
    <div>
      <img src={isFirst ? photo1 : photo2} alt="Toggled" />
      <button onClick={() => setIsFirst(!isFirst)}>Toggle Image</button>
    </div>
  );
}
\`\`\`

---

## Best Practices

1. **Optimize images** before importing — compress them to reduce page load times
2. **Use responsive images** with the \`srcSet\` attribute for different screen sizes
3. **Lazy load** offscreen images to improve initial page performance
4. **Use external services** (Cloudinary, YouTube) for hosting large media files

| Feature | HTML | React |
|---------|------|-------|
| Local images | \`<img src="./photo.jpg">\` | Import and use variable |
| Dynamic media | Requires JS DOM manipulation | Directly via props/state |
| Lazy loading | Limited support | Third-party libraries or React.lazy |

---

## Summary

- **Import** local images in React — the build tool optimizes them
- The **public folder** serves static files directly (no optimization)
- URLs and dynamic media work seamlessly with **props and state**
- Follow best practices: **optimize, lazy load, and use responsive images**
`;

export default content;
