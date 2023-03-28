// ./components/Counter.js
import { useSelector, useDispatch } from 'react-redux';

export default function Counter() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.value);

  const incrementValue = () => dispatch({ type: 'INCREMENT' });
  const decrementValue = () => dispatch({ type: 'DECREMENT' });
  const setValue = (newValue) =>
    dispatch({ type: 'SET_VALUE', payload: newValue });

  return (
    <div className="flex items-center border rounded p-2">
      <label className="text-xl font-bold mr-2">$</label>
      <input
        type="number"
        value={'$' + value}
        onChange={(event) => {
          const newValue = parseInt(event.target.value.replace(/^\$/, ''));
          if (!isNaN(newValue)) {
            setValue(newValue);
          }
        }}
        className="flex-1 text-center bg-transparent border-none"
      />
      <button
        onClick={incrementValue}
        className="px-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        +
      </button>
      <button
        onClick={decrementValue}
        className="px-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        -
      </button>
    </div>
  );
}
