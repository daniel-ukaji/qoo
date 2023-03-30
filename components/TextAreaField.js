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
        className="border-2 outline-none border-[#EAECF0] rounded-lg py-2 px-4 block w-3/4 h-28 appearance-none leading-normal"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextAreaField;
