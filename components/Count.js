import { useState } from "react";

const Count = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const handleChange = (event) => {
    setCount(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col items-center">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={increment}>
        +
      </button>
      <input className="text-center w-12 mt-2" type="number" value={count} onChange={handleChange} />
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={decrement}>
        -
      </button>
    </div>
  );
};

export default Count;
