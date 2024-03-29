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
        className='w-8 h-8 text-blue-600 accent-[#DB5461] bg-gray-100 rounded border-gray-300 outline-none'
      />
        <label
          key={option}
          className={`p-2 cursor-pointer text-lg ${
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
