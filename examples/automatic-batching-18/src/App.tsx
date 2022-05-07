import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      console.time("still a bad idea");
      for (let i = 0; i < 20000; i++) {
        setCount((c) => c + 1);
      }
      console.timeEnd("still a bad idea");
    }, 1000);
  }, []);
  return <div className="App">Count: {count}</div>;
}

export default App;
