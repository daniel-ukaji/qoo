import { useSelector, useDispatch } from 'react-redux';
import InputField from '../components/InputField'
import Layout from '../components/Layout'

const PageTestThree = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.page3Input);

  const handleInputChange = (e) => {
    dispatch({ type: 'SET_PAGE3_INPUT', payload: e.target.value });
  };

  const handleNextClick = () => {
    if (!inputValue) return; // Do not proceed if input field is empty
    dispatch({ type: 'SET_PAGE3_INPUT', payload: inputValue });
    dispatch({ type: 'SET_PAGE_NUMBER', payload: 4 });
  };

  return (
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <div className="">
              <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
            </div>

            <div className='flex flex-col space-y-8'>
              <div className="relative">
                <InputField
                  label="Enter your Address:"
                  placeholder="Name"
                  value={inputValue}
                  onChange={handleInputChange}
                  className=""
                  setPageInput={(option) => ({
                      type: 'SET_PAGE3_INPUT',
                      payload: option,
                })}
                />
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-gray-600 text-sm'>Street</label>
              </div>

              <div className="relative">
                <InputField
                  label="Enter your Address:"
                  placeholder="Name"
                  value={inputValue}
                  onChange={handleInputChange}
                  className=""
                  setPageInput={(option) => ({
                      type: 'SET_PAGE3_INPUT',
                      payload: option,
                })}
                />
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-gray-600 text-sm'>City</label>
              </div>

              <div className="relative">
                <InputField
                  label="Enter your Address:"
                  placeholder="Name"
                  value={inputValue}
                  onChange={handleInputChange}
                  className=""
                  setPageInput={(option) => ({
                      type: 'SET_PAGE3_INPUT',
                      payload: option,
                })}
                />
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-gray-600 text-sm'>State(Optional)</label>
              </div>

              <div className="relative">
                <InputField
                  label="Enter your Address:"
                  placeholder="Name"
                  value={inputValue}
                  onChange={handleInputChange}
                  className=""
                  setPageInput={(option) => ({
                      type: 'SET_PAGE3_INPUT',
                      payload: option,
                })}
                />
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-gray-600 text-sm'>Zip Code (Optional)</label>
              </div>

              <div className="relative">
                <InputField
                  label="Enter your Address:"
                  placeholder="Name"
                  value={inputValue}
                  onChange={handleInputChange}
                  className=""
                  setPageInput={(option) => ({
                      type: 'SET_PAGE3_INPUT',
                      payload: option,
                })}
                />
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-gray-600 text-sm'>Country</label>
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
        </div>
    </Layout>
  );
};

export default PageTestThree;
