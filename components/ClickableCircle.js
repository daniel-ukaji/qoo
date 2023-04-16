import Image from 'next/image';
import { useDispatch } from 'react-redux';
import hostlogo from '../public/images/hostlogo.png'


const ClickableCircle = ({ options, selectedOption, setPageSelection }) => {
  const dispatch = useDispatch();

  const handleOptionClick = (option) => {
    dispatch(setPageSelection(option));
  };

  return (
    <div className="flex flex-wrap md:justify-start space-x-1 xl:space-x-3 md:space-x-5 md:items-start">
      {options.map((option) => (
        <div
          key={option}
          className={`px-8 inline-block py-4 border hover:border-[#DB5461] rounded-[80px] cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  ${
            selectedOption === option ? 'border-[#DB5461]' : 'border-gray-300'
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default ClickableCircle;
