import { useDispatch } from 'react-redux';

const ButtonButton = ({ options, selectedOption, setPageSelection }) => {
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    dispatch(setPageSelection(e.target.value));
  };

  return (
    <div className="">
      {options.map((option) => (
        <div className='flex mt-5 items-center pl-4 rounded border border-gray-200 dark:border-gray-700'>
        <label
          key={option}
          className={`py-4 ml-2 w-full text-sm font-bold text-gray-900 dark:text-gray-300 ${
            selectedOption === option ? 'bg-green-500 text-white' : ''
          }`}
        >
          {option}
        </label>
        <input
        type="radio"
        value={option}
        checked={selectedOption === option}
        onChange={handleOptionChange}
        className='w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3'
      />
      </div>
      ))}
    </div>
  );
};

export default ButtonButton;
