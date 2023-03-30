import { useDispatch } from 'react-redux';

const InputField = ({ inputValue, setPageInput }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setPageInput(e.target.value));
  };

  return (
    <div className="">
      <input
        type="text"
        id="inputField"
        className="border-2 border-[#E9EBEF] bg-transparent text-[#D1D5DB] outline-none rounded-lg py-2 px-4 block w-3/4 appearance-none leading-normal"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputField;
