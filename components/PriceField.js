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
        className="text-center text-3xl border-2 outline-none bg-white border-[#EAECF0] rounded-lg py-2 px-4 block w-96 h-20 appearance-none leading-normal"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PriceField;
