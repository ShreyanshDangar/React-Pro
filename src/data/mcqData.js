const mcqData = [
  {
    category: 'Fundamentals',
    questions: [
      {
        question: 'What is React?',
        options: [
          'A full-featured framework like Angular',
          'A JavaScript library for building user interfaces',
          'A CSS preprocessor',
          'A database management system',
        ],
        correct: 1,
        explanation:
          'React is a JavaScript library (not a framework) for building user interfaces. It focuses only on rendering UI, managing component state, and handling updates efficiently.',
      },
      {
        question: 'Why does React use className instead of class?',
        options: [
          'className is shorter to type',
          'class is a reserved keyword in JavaScript',
          'className provides better performance',
          'There is no difference between the two',
        ],
        correct: 1,
        explanation:
          'In JavaScript, "class" is a reserved keyword used for ES6 classes. Since JSX is compiled to JavaScript, React uses "className" to avoid conflicts with the JavaScript class keyword.',
      },
      {
        question: 'How are inline styles written in React?',
        options: [
          'As a CSS string like in HTML',
          'As a JavaScript object with camelCase properties',
          'Using the <style> tag inside JSX',
          'By importing a .css file',
        ],
        correct: 1,
        explanation:
          'React inline styles are JavaScript objects with camelCase properties (e.g., fontSize instead of font-size). Values can be strings or numbers, and React assumes "px" for numeric values.',
      },
      {
        question: 'How do you import a local image in React?',
        options: [
          'Use the src attribute directly like in HTML',
          'Use import statement and pass the imported variable to src',
          'Use document.createElement',
          'Images cannot be used in React',
        ],
        correct: 1,
        explanation:
          'In React, local images must be imported using import statements. The build tool (Webpack/Vite) processes these imports and replaces them with optimized file URLs during the build process.',
      },
      {
        question: 'What does the Virtual DOM do in React?',
        options: [
          'It replaces the real DOM entirely',
          'It keeps a virtual copy and only updates changed parts of the real DOM',
          'It makes the browser faster',
          'It removes the need for HTML',
        ],
        correct: 1,
        explanation:
          'React maintains a virtual representation of the UI in memory. When state changes, React creates a new virtual tree, diffs it with the old one, and applies only the minimal changes to the real DOM.',
      },
      {
        question: 'What is JSX?',
        options: [
          'A new programming language',
          'Syntax sugar for React.createElement() calls',
          'A replacement for HTML',
          'A CSS-in-JS library',
        ],
        correct: 1,
        explanation:
          'JSX is syntax sugar that compiles to React.createElement() function calls. It allows you to write HTML-like code inside JavaScript, making UI logic and markup live together.',
      },
      {
        question: 'What is the key prop used for when rendering lists with map()?',
        options: [
          'To style elements differently',
          'To help React identify which items changed, added, or removed',
          'To sort the list items',
          'To add event listeners to each item',
        ],
        correct: 1,
        explanation:
          'The key prop helps React identify which items have changed, been added, or removed during reconciliation. Each key should be unique among siblings for efficient DOM updates.',
      },
      {
        question: 'What is a controlled component in React?',
        options: [
          'A component that controls other components',
          'An input whose value is controlled by React state',
          'A component with no props',
          'A component using Redux',
        ],
        correct: 1,
        explanation:
          'A controlled component has its form input value controlled by React state. The value attribute is set to a state variable, and onChange updates the state, giving React full control over the form data.',
      },
      {
        question: 'Which operator is best for rendering content only when a condition is true?',
        options: [
          'Ternary operator (?:)',
          'Logical AND (&&) operator',
          'Logical OR (||) operator',
          'Nullish coalescing (??)',
        ],
        correct: 1,
        explanation:
          'The logical AND (&&) operator renders the element after it only when the condition is true. If the condition is false, nothing is rendered, avoiding the need for an else block.',
      },
      {
        question: 'What is prop drilling?',
        options: [
          'A technique to optimize props',
          'Passing props through multiple component layers to reach a deeply nested child',
          'Drilling into the DOM to find props',
          'A way to delete props from components',
        ],
        correct: 1,
        explanation:
          'Prop drilling is the process of passing data through multiple intermediate components that don\'t need the data, just to reach a deeply nested child component. Context API helps solve this.',
      },
      {
        question: 'Which command starts a Vite development server after installation?',
        options: [
          'npm run dev',
          'npm start',
          'vite start',
          'npm run preview',
        ],
        correct: 0,
        explanation:
          'In a standard Vite project, `npm run dev` starts the local development server with fast hot-module reloading. `npm run preview` is for previewing the production build instead.',
      },
      {
        question: 'How should you pass a click handler to a JSX button?',
        options: [
          'onClick={handleClick}',
          'onClick="handleClick()"',
          'onClick={handleClick()} every time',
          'click={handleClick}',
        ],
        correct: 0,
        explanation:
          'In React, event handlers are passed as functions, so you write `onClick={handleClick}`. Writing `handleClick()` calls the function immediately during render instead of when the user clicks.',
      },
      {
        question: 'Which prop controls a checkbox in a controlled React form?',
        options: [
          'value',
          'selected',
          'checked',
          'active',
        ],
        correct: 2,
        explanation:
          'Checkboxes use the `checked` prop in controlled React forms. Their change handler typically reads `event.target.checked` instead of `event.target.value`.',
      },
      {
        question: 'Why do React form submit handlers often call event.preventDefault()?',
        options: [
          'To clear all inputs automatically',
          'To stop the browser from reloading the page on submit',
          'To trigger validation in React',
          'To skip state updates',
        ],
        correct: 1,
        explanation:
          'A browser form submit normally reloads the page. `event.preventDefault()` stops that default browser behavior so React can handle the submission in JavaScript.',
      },
    ],
  },
  {
    category: 'React Hooks',
    questions: [
      {
        question: 'What does useState return?',
        options: [
          'A single state value',
          'An array with the current state value and a setter function',
          'An object with state and methods',
          'A promise that resolves to the state',
        ],
        correct: 1,
        explanation:
          'useState returns an array with exactly two elements: the current state value and a function to update it. We typically destructure them: const [state, setState] = useState(initialValue).',
      },
      {
        question: 'When does a useEffect with an empty dependency array run?',
        options: [
          'On every render',
          'Only once after the initial render',
          'When any state changes',
          'It never runs',
        ],
        correct: 1,
        explanation:
          'A useEffect with an empty dependency array [] runs only once after the initial render, similar to componentDidMount in class components. This is ideal for data fetching or initial setup.',
      },
      {
        question: 'What is the cleanup function in useEffect used for?',
        options: [
          'To delete the component',
          'To remove event listeners, clear timers, or cancel subscriptions',
          'To reset the state',
          'To re-render the component',
        ],
        correct: 1,
        explanation:
          'The cleanup function returned from useEffect runs before the component unmounts or before the effect re-runs. It is used to clean up resources like event listeners, timers, or subscriptions.',
      },
      {
        question: 'What does useContext solve?',
        options: [
          'Performance optimization',
          'Prop drilling by providing global state access',
          'Form validation',
          'Routing between pages',
        ],
        correct: 1,
        explanation:
          'useContext eliminates prop drilling by providing a way to share data globally across components without passing props through every intermediate component. It works with React\'s Context API.',
      },
      {
        question: 'What is the difference between useMemo and useCallback?',
        options: [
          'They are the same thing',
          'useMemo memoizes a value, useCallback memoizes a function',
          'useMemo is for arrays, useCallback is for objects',
          'useMemo runs on mount, useCallback runs on update',
        ],
        correct: 1,
        explanation:
          'useMemo memoizes the result of a computation (a value), while useCallback memoizes a function itself. Both prevent unnecessary recalculations/recreations between renders.',
      },
      {
        question: 'What does useRef NOT do?',
        options: [
          'Access DOM elements directly',
          'Store mutable values between renders',
          'Trigger a re-render when its value changes',
          'Track timer IDs',
        ],
        correct: 2,
        explanation:
          'Unlike useState, changing a useRef value does NOT trigger a re-render. useRef is perfect for accessing DOM elements, storing timer IDs, or tracking values that change frequently without needing UI updates.',
      },
      {
        question: 'When should you use useReducer over useState?',
        options: [
          'For simple boolean toggles',
          'When state logic is complex with multiple sub-values or actions',
          'When you only have one state variable',
          'useReducer should always be used instead of useState',
        ],
        correct: 1,
        explanation:
          'useReducer is better suited for complex state logic involving multiple sub-values, multiple actions, or when the next state depends on the previous state. It centralizes state transitions in a reducer function.',
      },
      {
        question: 'What naming convention must custom hooks follow?',
        options: [
          'They must start with "hook"',
          'They must start with "use"',
          'They must start with "custom"',
          'There is no naming convention',
        ],
        correct: 1,
        explanation:
          'Custom hooks must start with the prefix "use" (e.g., useFetchData, useForm). This naming convention allows React to enforce the rules of hooks and enables linting tools to check for violations.',
      },
      {
        question: 'What is lazy initialization in useState?',
        options: [
          'Updating state slowly for performance',
          'Passing a function so the initial value is computed only on the first render',
          'Delaying state updates until a timeout finishes',
          'Creating state only after useEffect runs',
        ],
        correct: 1,
        explanation:
          'If the initial state is expensive to calculate, you can pass a function to `useState`. React calls it only during the initial render, avoiding repeated work on later renders.',
      },
      {
        question: 'If an effect uses a prop or state value inside its callback, what is usually the correct rule?',
        options: [
          'Ignore it unless the app breaks',
          'Include that value in the dependency array',
          'Always remove the dependency array',
          'Move the value into localStorage',
        ],
        correct: 1,
        explanation:
          'When an effect reads props or state, those values generally belong in the dependency array. Otherwise the effect can run with stale values and create subtle bugs.',
      },
      {
        question: 'What does dispatch do in useReducer?',
        options: [
          'It directly mutates state',
          'It sends an action to the reducer so React can calculate the next state',
          'It re-renders every component in the app',
          'It replaces useEffect',
        ],
        correct: 1,
        explanation:
          'With `useReducer`, you call `dispatch(action)`. React passes that action to the reducer function, and the reducer returns the next state based on the action type and payload.',
      },
      {
        question: 'What is the main value of a custom hook?',
        options: [
          'It creates global CSS variables',
          'It reuses stateful logic across components',
          'It replaces components entirely',
          'It prevents all re-renders',
        ],
        correct: 1,
        explanation:
          'Custom hooks let you extract and reuse logic that uses state, effects, refs, or other hooks. They share behavior, not UI markup.',
      },
      {
        question: 'When is useRef usually a better choice than useState?',
        options: [
          'When the UI must update after every change',
          'When you want to track a mutable value without triggering a re-render',
          'When you need to fetch API data',
          'When you need routing information',
        ],
        correct: 1,
        explanation:
          'A ref is ideal for values like DOM nodes, timer IDs, or previous values that should persist between renders without causing another render when they change.',
      },
    ],
  },
  {
    category: 'Components',
    questions: [
      {
        question: 'What method must every class component have?',
        options: [
          'constructor()',
          'render()',
          'componentDidMount()',
          'setState()',
        ],
        correct: 1,
        explanation:
          'Every class component must include a render() method that returns JSX. The render method is the only required lifecycle method in a class component.',
      },
      {
        question: 'How do you access props in a class component?',
        options: [
          'Through function parameters',
          'Using this.props',
          'Using useProps() hook',
          'Through the constructor only',
        ],
        correct: 1,
        explanation:
          'In class components, props are accessed using this.props (e.g., this.props.name). In functional components, props are received as function parameters.',
      },
      {
        question: 'What is the modern equivalent of componentDidMount in functional components?',
        options: [
          'useMount()',
          'useEffect with an empty dependency array',
          'useState with initial value',
          'useLayoutEffect',
        ],
        correct: 1,
        explanation:
          'useEffect(() => { ... }, []) with an empty dependency array is equivalent to componentDidMount. It runs once after the initial render, making it ideal for setup tasks like data fetching.',
      },
      {
        question: 'What does React.memo do?',
        options: [
          'Adds memory to a component',
          'Prevents unnecessary re-renders by memoizing the component',
          'Stores component state in memory',
          'Creates a memo pad UI element',
        ],
        correct: 1,
        explanation:
          'React.memo is a higher-order component that prevents unnecessary re-renders. It memoizes the rendered output and only re-renders if the props change, improving performance.',
      },
      {
        question: 'How does a functional component usually receive props?',
        options: [
          'Through this.props',
          'As function parameters',
          'By calling getProps()',
          'From the DOM directly',
        ],
        correct: 1,
        explanation:
          'Functional components receive props as function parameters, often destructured immediately, such as `function Card({ title }) { ... }`.',
      },
      {
        question: 'Where is local state stored in a class component?',
        options: [
          'Inside this.state',
          'Inside props.state',
          'Inside useState',
          'Inside componentDidMount',
        ],
        correct: 0,
        explanation:
          'Class components keep their local state inside `this.state`. React then re-renders the component when that state changes via `this.setState()`.',
      },
      {
        question: 'Which method is used to update state in a class component?',
        options: [
          'this.updateState()',
          'this.changeState()',
          'this.setState()',
          'this.useState()',
        ],
        correct: 2,
        explanation:
          'Class components use `this.setState()` to schedule state updates. React then re-renders the component with the new state values.',
      },
      {
        question: 'Why are functional components the standard choice in modern React?',
        options: [
          'They are the only components React supports',
          'They work naturally with hooks and usually require less boilerplate',
          'They render outside the Virtual DOM',
          'They automatically memoize every value',
        ],
        correct: 1,
        explanation:
          'Modern React centers around functional components because hooks give them state, effects, refs, and other features without the extra ceremony of class components.',
      },
    ],
  },
  {
    category: 'Advanced',
    questions: [
      {
        question: 'What replaced the Switch component in React Router v6?',
        options: [
          'Router',
          'Routes',
          'Navigate',
          'Outlet',
        ],
        correct: 1,
        explanation:
          'React Router v6 replaced the Switch component with Routes. Routes renders the first matching child Route and provides a more intuitive API for defining routes.',
      },
      {
        question: 'Which hook is used to access URL parameters in React Router?',
        options: [
          'useLocation',
          'useParams',
          'useNavigate',
          'useRoute',
        ],
        correct: 1,
        explanation:
          'useParams returns an object of key/value pairs from the URL parameters. For example, for a route "/user/:id", useParams would return { id: "123" }.',
      },
      {
        question: 'What is the recommended approach for async API calls in React?',
        options: [
          'Callbacks with nested fetch calls',
          'async/await within useEffect',
          'document.fetch() directly in JSX',
          'Using XMLHttpRequest',
        ],
        correct: 1,
        explanation:
          'async/await within useEffect is the most recommended approach for React applications. It provides clean syntax, easy error handling with try/catch, and seamless integration with React\'s lifecycle.',
      },
      {
        question: 'What is the event loop responsible for?',
        options: [
          'Creating new DOM elements',
          'Executing tasks in a non-blocking way by managing the call stack and callback queue',
          'Styling React components',
          'Compiling JSX to JavaScript',
        ],
        correct: 1,
        explanation:
          'The event loop manages asynchronous execution in JavaScript. It continuously checks if the call stack is empty and moves pending tasks from the callback/microtask queue onto the stack for execution.',
      },
      {
        question: 'Which React Router component renders the matched child route inside a parent layout?',
        options: [
          'Navigate',
          'Outlet',
          'RouterView',
          'Params',
        ],
        correct: 1,
        explanation:
          'Nested routes render through `Outlet`. The parent route provides the shared layout, and the child route appears inside the `Outlet` placeholder.',
      },
      {
        question: 'Which hook gives you information about the current URL location?',
        options: [
          'useNavigate',
          'useRoute',
          'useLocation',
          'useCurrentPath',
        ],
        correct: 2,
        explanation:
          '`useLocation` returns the current location object, which includes details such as pathname, search, and hash for the active route.',
      },
      {
        question: 'Where do resolved Promise callbacks run before regular queued browser tasks?',
        options: [
          'The render queue',
          'The microtask queue',
          'The style queue',
          'The DOM queue',
        ],
        correct: 1,
        explanation:
          'Promise callbacks go to the microtask queue. Microtasks run before the browser processes the next macrotask, which is why Promise chains often finish before timers like `setTimeout`.',
      },
      {
        question: 'What is the recommended pattern for data fetching with useEffect?',
        options: [
          'Make the component function itself async',
          'Declare an async function inside the effect and call it',
          'Fetch data directly in JSX',
          'Use document.fetch inside render',
        ],
        correct: 1,
        explanation:
          'Components must return JSX synchronously, so the usual pattern is to create an async function inside `useEffect`, call it, and handle loading or errors from there.',
      },
      {
        question: 'Which hook is typically used to update the URL in code after a form submit or login?',
        options: [
          'useParams',
          'useSearchParams',
          'useNavigate',
          'useOutlet',
        ],
        correct: 2,
        explanation:
          '`useNavigate` lets you change routes programmatically, which is useful for redirects after actions like login, checkout, or successful form submission.',
      },
    ],
  },
  {
    category: 'State Management',
    questions: [
      {
        question: 'What are the three core principles of Redux?',
        options: [
          'Speed, Security, Scalability',
          'Single source of truth, State is read-only, Changes via pure functions',
          'Components, Props, State',
          'Actions, Reducers, Views',
        ],
        correct: 1,
        explanation:
          'Redux follows three principles: (1) Single source of truth - entire state in one store, (2) State is read-only - can only be changed via actions, (3) Changes are made with pure functions (reducers).',
      },
      {
        question: 'What does createSlice in Redux Toolkit provide?',
        options: [
          'Only reducers',
          'State, reducers, and auto-generated action creators in one module',
          'Only action creators',
          'A database connection',
        ],
        correct: 1,
        explanation:
          'createSlice is a function that accepts initial state, reducers, and a name, and automatically generates action creators and action types. It bundles state, reducers, and actions in one module.',
      },
      {
        question: 'What does RTK Query automate?',
        options: [
          'Only data fetching',
          'Data fetching, caching, loading states, error handling, and refetching',
          'Only error handling',
          'Database queries',
        ],
        correct: 1,
        explanation:
          'RTK Query automates data fetching, caching, loading/error states, automatic refetching, and cache invalidation. It eliminates the need to manually manage API call states with Redux.',
      },
      {
        question: 'Why should you use Redux instead of making API calls with useEffect in every component?',
        options: [
          'Redux is always faster',
          'Redux provides centralized state, caching, and prevents duplicate API calls',
          'useEffect cannot make API calls',
          'Redux replaces the need for components',
        ],
        correct: 1,
        explanation:
          'When multiple components need the same API data, Redux stores it centrally so all components share data without re-fetching. It also provides automatic caching, global loading/error states, and auto-refetching.',
      },
      {
        question: 'What is a key advantage of Redux over LocalStorage?',
        options: [
          'Redux persists data when the browser closes',
          'Redux triggers UI re-renders automatically when state changes',
          'Redux stores data permanently',
          'Redux works without JavaScript',
        ],
        correct: 1,
        explanation:
          'Unlike LocalStorage, Redux state changes automatically trigger UI re-renders in React. LocalStorage only stores strings, doesn\'t trigger re-renders, and requires manual JSON parsing.',
      },
      {
        question: 'What is a Redux action?',
        options: [
          'A plain object that describes what happened',
          'A DOM event listener',
          'A React component',
          'A database model',
        ],
        correct: 0,
        explanation:
          'A Redux action is a plain JavaScript object that describes an event in the app, usually with a `type` field and sometimes a payload with extra data.',
      },
      {
        question: 'What does configureStore from Redux Toolkit do?',
        options: [
          'It only creates reducers',
          'It sets up the Redux store with sensible defaults and middleware',
          'It replaces react-redux Provider',
          'It turns localStorage into a store',
        ],
        correct: 1,
        explanation:
          '`configureStore` creates the Redux store and includes good defaults like middleware setup and DevTools integration, which removes a lot of manual configuration.',
      },
      {
        question: 'Why can Redux Toolkit reducers appear to mutate state directly?',
        options: [
          'Redux Toolkit turns off immutability',
          'Immer translates those mutations into safe immutable updates',
          'Reducers are allowed to modify the store in place',
          'The browser clones the store automatically',
        ],
        correct: 1,
        explanation:
          'Redux Toolkit uses Immer under the hood. You write reducer logic in a mutating style, and Immer produces the correct immutable updated state for you.',
      },
      {
        question: 'Which three action states are created automatically by createAsyncThunk?',
        options: [
          'start, finish, stop',
          'pending, fulfilled, rejected',
          'loading, success, retry',
          'request, response, cache',
        ],
        correct: 1,
        explanation:
          '`createAsyncThunk` generates pending, fulfilled, and rejected action types so reducers can track loading, success, and failure states cleanly.',
      },
      {
        question: 'What is one of RTK Query’s strongest advantages over manual fetch logic?',
        options: [
          'It removes the need for reducers entirely',
          'It handles caching, refetching, and API state for you',
          'It only works with GraphQL',
          'It stores data permanently in sessionStorage',
        ],
        correct: 1,
        explanation:
          'RTK Query centralizes API state and automates common concerns like caching, refetching, and loading/error handling, which reduces repetitive manual code.',
      },
      {
        question: 'Why is LocalStorage not a replacement for shared app state?',
        options: [
          'It cannot store strings',
          'It does not notify React to re-render when values change',
          'It works only in development',
          'It can only store arrays',
        ],
        correct: 1,
        explanation:
          'LocalStorage is just persistent browser storage. Updating it does not automatically update React UI, so shared interactive state still needs a state-management solution.',
      },
    ],
  },
];

export default mcqData;
