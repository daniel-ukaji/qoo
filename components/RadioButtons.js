import { useDispatch } from 'react-redux';

const RadioButtons = ({ options, selectedOption, setPageSelection }) => {
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    dispatch(setPageSelection(e.target.value));
  };

  return (
    <div className="flex flex-col space-y-8">
      {options.map((option) => (
        <div className='flex mt-5 items-center pl-4 pt-2 pb-2 rounded border border-black dark:border-gray-700'>
        <label
          key={option}
          htmlFor={`option-${option}`}
          className={`cursor-pointer py-4 ml-2 w-full text-sm font-bold text-black dark:text-gray-300 ${
            selectedOption === option ? ' text-black' : ''
          }`}
        >
          {option}
        </label>
        <input
        type="radio"
        id={`option-${option}`}
        value={option}
        checked={selectedOption === option}
        onChange={handleOptionChange}
        className='w-8 h-8 bg-transparent border-gray-300 outline-none accent-[#DB5461]  mr-3'
      />
      </div>
      ))}
    </div>
  );
};

export default RadioButtons;
