import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout'
import InputField from '../components/InputField';
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import Minus from '../pages/images/minus.png'
import Plus from '../pages/images/plus.png'
import PriceField from '../components/PriceField';


const PageTestEleven = () => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state) => state.page11Input);

    const handleInputChange = (e) => {
        dispatch({ type: 'SET_PAGE11_INPUT', payload: e.target.value });
    };

    const handleNextClick = () => {
        if (!inputValue) return; // Do not proceed if input field is empty
        dispatch({ type: 'SET_PAGE11_INPUT', payload: inputValue });
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 13 });
    };



    

  return (
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <div className="">
              <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
            </div>

            <div>
              <h1 className='font-bold'>Set your price</h1>
              <div className="flex space-x-4 items-center">
                  <button className="border w-10 rounded-lg p-1 relative text-center">
                          <Image src={Minus} className="border p-10"/>
                  </button>
                  <div className='flex flex-col items-center mt-6'>
                    <PriceField
                        label="Enter your name:"
                        placeholder="Name"
                        value={inputValue}
                        onChange={handleInputChange}
                        setPageInput={(option) => ({
                            type: 'SET_PAGE11_INPUT',
                            payload: option,
                        })}
                    />
                    <p className='mt-3 text-gray-500'>Per night</p>
                  </div>
                  <button className="border w-10 rounded-lg p-1 relative text-center" >
                          <Image src={Plus} className="border p-10"/>
                  </button>
              </div>
            </div>

            <div>
              <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200"
                disabled={!inputValue}
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
        </div>
        <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
            {/* <!-- Content for the right side --> */}
            <div className='h-10 w-10'>
                <Image src={HostFrame}  />
            </div>

            <div className='font-sora font-bold mb-36 flex flex-col space-y-5'>
                <p className='text-3xl text-white'>2.</p>
                <p className='text-4xl text-white'>Now set your price</p>
            </div>

            <div>

            </div>
        </div>
    </Layout>
  );
};

export default PageTestEleven;
