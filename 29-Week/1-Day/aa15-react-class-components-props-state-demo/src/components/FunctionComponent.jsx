import { useEffect, useState } from 'react';

function FunctionComponent({ title }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component has updated")
  }, [])

  return (
    <>
      <h1>{title}</h1>
      <div>{count}</div>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Increment
      </button>
    </>
  );
}

export default FunctionComponent;
