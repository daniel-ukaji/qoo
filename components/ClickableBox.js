import Image from 'next/image';
import { useDispatch } from 'react-redux';
import hostlogo from '../public/images/hostlogo.png'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'


const ClickableBox = ({ options, selectedOption, setPageSelection }) => {
  const dispatch = useDispatch();

  const handleOptionClick = (option) => {
    dispatch(setPageSelection(option));
  };

  return (
    <div className="grid grid-cols-2 gap-2 xl:grid-cols-3 xl:gap-3">
      {options.map((option) => (
        <div
          key={option}
          className={`p-2 md:p-4 m-2 font-sora cursor-pointer border text-sm font-medium text-black hover:border-[#DB5461] rounded-md flex flex-col justify-center items-start space-y-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  ${
            selectedOption === option ? 'border-[#DB5461]' : 'border-gray-300'
          }`}
          onClick={() => handleOptionClick(option)}
        >
          <HiOutlineBuildingOffice2 className='w-6 h-6 text-primary mb-2' />
          {/* <Image src={hostlogo}  /> */}
          {option}
        </div>
      ))}
    </div>
  );
};

export default ClickableBox;
