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
        className="rounded-lg px-4 py-3 outline-none h-12 border border-black w-[35rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputField;
