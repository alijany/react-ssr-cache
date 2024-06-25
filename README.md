Certainly! Here's the updated README with an additional example for heavy calculations:

# react-ssr-cache

`react-ssr-cache` is a React library designed to optimize server-side rendering (SSR) by caching data on the server for reuse on the client side. This reduces the need for clients to refetch data, particularly for heavy computations or data fetching operations, improving performance and user experience. The library seamlessly detects the environment (server or client) and operates accordingly, eliminating the need for conditional rendering in your code.

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

### `useSsrCache(key: string): any`

A hook to retrieve cached data by key. If the data is not cached, it returns `null`.

**Parameters:**
- `key` (string): The key used to store and retrieve the cached data.

**Returns:**
- The cached data if available, otherwise `null`.

### `<SsrCache data={data} name="key" />`

A component to cache data during server-side rendering.

**Props:**
- `data` (any): The data to cache.
- `name` (string): The key used to store the cached data.

## Contributing

We welcome contributions!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

We thank all our contributors and users who inspire us to make web development easier and more efficient.

---

Feel free to reach out with any questions or feedback. Happy coding!