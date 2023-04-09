import { useDispatch } from 'react-redux';

const RadioButtons = ({ options, selectedOption, setPageSelection }) => {
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    dispatch(setPageSelection(e.target.value));
  };

  return (
    <div className="flex flex-col space-y-6">
      {options.map((option) => (
  <div className='flex mt-2 font-sora items-center pl-4 rounded border border-black dark:border-gray-700'>
    <label
      key={option.label}
      htmlFor={`option-${option.label}`}
      className={`cursor-pointer py-4 ml-2 w-full text-xl font-bold text-black dark:text-gray-300 ${
        selectedOption === option.label ? ' text-black' : ''
      }`}
    >
      {option.label}
      <div className="text-sm text-gray-500 mt-2">{option.additionalText}</div>
    </label>
    <input
      type="radio"
      id={`option-${option.label}`}
      value={option.label}
      checked={selectedOption === option.label}
      onChange={handleOptionChange}
      className='w-10 h-10 bg-transparent border-gray-300 outline-none accent-[#DB5461]  mr-3'
    />
  </div>
))}

    </div>
  );
};

export default RadioButtons;
