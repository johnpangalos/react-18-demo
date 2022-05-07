import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [inc, setInc] = useState<number | undefined>();

  function handleClick() {
    setInc((c) => {
      if (c === undefined) return 1;
      return c + 1;
    });
  }

  useEffect(() => {
    if (inc === undefined) return;
    setTimeout(() => {
      console.time("this is still a bad idea");
      for (let i = 0; i < 20000; i++) {
        setCount((c) => c + 1);
      }
      console.timeEnd("this is still a bad idea");
    }, 50);
  }, [inc]);

  return (
    <div className="p-8 text-slate-800">
      <div className="text-3xl font-bold pb-3">
        React 18 Automatic Batching Example
      </div>
      <div className="text-xl pb-2">Count: {count}</div>
      <button
        className="bg-red-800 text-white px-3 py-2 rounded-lg"
        onClick={handleClick}
      >
        Increment
      </button>
    </div>
  );
}

export default App;
