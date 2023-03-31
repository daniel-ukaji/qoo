import { useDispatch } from 'react-redux';

const PriceField = ({ inputValue, setPageInput }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setPageInput(e.target.value));
  };

  return (
    <div className="">
      <input
        type="text"
        id="inputField"
        className="text-center bg-transparent border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg  block max-w-xl p-3   dark:placeholder-gray-400 dark:text-white"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PriceField;
