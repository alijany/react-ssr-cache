# react-ssr-cache

`react-ssr-cache` is a React library designed to optimize server-side rendering (SSR) by caching data on the server for reuse on the client side. This reduces the need for clients to refetch data, particularly for heavy computations or data fetching operations, improving performance and user experience. The library detects the environment (server or client) and operates accordingly, eliminating the need for conditional rendering in your code.

## Features

- **Automatic Environment Detection**: No need to manually distinguish between server and client environments in your code.
- **Data Caching**: Cache data during server-side rendering to reuse on the client side.
- **Ease of Use**: Simple hooks and components to integrate caching into your React components.
- **Performance Optimization**: Reduce redundant data fetching, especially for heavy calculations or large data sets.

## Installation

To install the library, use npm or yarn:

```bash
npm install react-ssr-cache
```

or

```bash
yarn add react-ssr-cache
```

## Usage

Here’s a basic example of how to use `SsrCache` component and `useSsrCache` hooks in a React component for data fetching.

### Example 1: Data Fetching

```jsx
import React, { useEffect, useState } from 'react';
import { useSsrCache, SsrCache } from 'react-ssr-cache';

const Comments: React.FC = () => {
  const cachedComments = useSsrCache('comments-data');
  const [comments, setComments] = useState(cachedComments || []);

  useEffect(() => {
    if (!cachedComments) {
      fetch('/api/comments')
        .then((response) => response.json())
        .then((data) => setComments(data));
    }
  }, [cachedComments]);

  if (!comments.length) {
    return <Spinner />;
  }

  return (
    <div>
      <SsrCache data={comments} name="comments-data" />
      {comments.map((comment) => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </div>
  );
};
```

### Example 2: Heavy Calculations

Here's an example of using `SsrCache` for caching the result of a heavy calculation.

```jsx
import React, { useEffect, useState } from 'react';
import { useSsrCache, SsrCache } from 'react-ssr-cache';

const calculatePrimeNumbers = (limit) => {
  // Heavy calculation to find prime numbers up to a certain limit
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
  }
  return primes;
};

const PrimeNumbers: React.FC = () => {
  const cachedPrimes = useSsrCache('prime-numbers');
  const [primes, setPrimes] = useState(cachedPrimes || []);

  useEffect(() => {
    if (!cachedPrimes) {
      const calculatedPrimes = calculatePrimeNumbers(10000);
      setPrimes(calculatedPrimes);
    }
  }, [cachedPrimes]);

  if (!primes.length) {
    return <Spinner />;
  }

  return (
    <div>
      <SsrCache data={primes} name="prime-numbers" />
      <h3>Prime Numbers:</h3>
      <ul>
        {primes.map((prime, index) => (
          <li key={index}>{prime}</li>
        ))}
      </ul>
    </div>
  );
};
```

## API

### `useSsrCache(key: string, options: { isWebPlatform: boolean }): any`

This hook retrieves cached data based on a specified `key`. If the data is not cached, it returns `null`.

- **Parameters:**
  - `key`: A unique string identifier for the cached data.
  - `options`: An object containing configuration options.
    - `isWebPlatform`: Boolean flag indicating if the platform is web (`true`) or not (`false`).

**Returns:**
- The cached data if available, otherwise `null`.

**Usage Note:**
If using in React Native and the platform is web-based (`Platform.OS === 'web'`), set `isWebPlatform` to `true` in the options object.

Example:

```typescript
import { useSsrCache } from 'your-cache-library';

const MyComponent = () => {
  const cachedData = useSsrCache('myDataKey', { isWebPlatform: Platform.OS === 'web' });

  // Use cachedData here...

  return (
    // JSX for your component
  );
};
```

This hook is particularly useful for efficiently managing server-side rendering (SSR) caches across different platforms.


### `<SsrCache data={data} name="key" />`

A component designed to cache data during server-side rendering.

**Props:**
- `data` (`any`): The data to be cached.
- `name` (`string`): The key used to store the cached data.
- `isWebPlatform` (`boolean`, optional): Indicates if the platform is web-based (`true`) or not (`false`). This prop is useful when integrating with React Native and determining the platform environment.

**Usage Note:**
Ensure `name` is a unique identifier for the cached data.

Example usage:

```jsx
import React from 'react';
import SsrCache from 'your-ssr-cache-library';

const MyComponent = ({ data }) => {
  return (
    <SsrCache data={data} name="uniqueKey" isWebPlatform={Platform.OS === 'web'} />
    // Render your component content
  );
};
```

This component optimizes caching during SSR processes, enhancing performance and data accessibility.

## Contributing

We welcome contributions!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

We thank all our contributors and users who inspire us to make web development easier and more efficient.

---

Feel free to reach out with any questions or feedback. Happy coding!
