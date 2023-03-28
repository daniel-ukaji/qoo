import { useDispatch } from 'react-redux';

const TextAreaField = ({ inputValue, setPageInput }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setPageInput(e.target.value));
  };

  return (
    <div className="">
      <textarea
        type="text"
        id="inputField"
        className="border-2 border-gray-300 rounded-lg py-2 px-4 block w-3/4 h-32 appearance-none leading-normal"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextAreaField;
