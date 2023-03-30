import Image from 'next/image';
import { useDispatch } from 'react-redux';
import hostlogo from '../public/images/hostlogo.png'


const ClickableBox = ({ options, selectedOption, setPageSelection }) => {
  const dispatch = useDispatch();

  const handleOptionClick = (option) => {
    dispatch(setPageSelection(option));
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((option) => (
        <label
          key={option}
          className={`p-4 m-2 cursor-pointer border text-black hover:border-[#DB5461] rounded-md flex flex-col justify-center items-start space-y-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  ${
            selectedOption.includes(option) ? 'border-[#DB5461]' : 'border-gray-300'
          }`}
        >
          <Image src={hostlogo}  />
          <input
            type="checkbox"
            // checked={selectedOption.includes(option)}
            onChange={() => handleOptionClick(option)}
            className='hidden'
          />
          {option}
        </label>
      ))}
    </div>
  );
  
};

export default ClickableBox;
