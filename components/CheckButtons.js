import { useDispatch } from 'react-redux';

const CheckButtons = ({ options, selectedOption, setPageSelection }) => {
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    dispatch(setPageSelection(e.target.value));
  };

  return (
    <div>
      {options.map((option) => (
        <div className="flex items-center space-x-3">
        <input
        type="checkbox"
        value={option}
        checked={selectedOption === option}
        onChange={handleOptionChange}
        className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
      />
        <label
          key={option}
          className={`p-2 cursor-pointer ${
            selectedOption === option ? ' text-black' : 'text-gray-500'
          }`}
        >
          {option}
        </label>
        </div>
      ))}
    </div>
  );
};

export default CheckButtons;