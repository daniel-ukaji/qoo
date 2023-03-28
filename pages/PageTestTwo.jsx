import { useSelector, useDispatch } from 'react-redux';
import RadioButtons from '../components/RadioButtons'
import Layout from '../components/Layout'
import ButtonButton from '../components/ButtonButton';

const PageTestTwo = () => {
    const dispatch = useDispatch();
    const selectedOption = useSelector((state) => state.page2Selection);
  
    const options = ['Entire Place', 'Private room', 'Shared room'];
  
    const handleNextClick = () => {
      if (!selectedOption) return; // Do not proceed if no option is selected
      dispatch({ type: 'SET_PAGE2_SELECTION', payload: selectedOption });
      dispatch({ type: 'SET_PAGE_NUMBER', payload: 3 });
    };

  return (
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <div className="">
              <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
            </div>

            <div className="">
                <ButtonButton
                    options={options}
                    selectedOption={selectedOption}
                    setPageSelection={(option) => ({
                    type: 'SET_PAGE2_SELECTION',
                    payload: option,
                })}
                />
            </div>

            <div>
              <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200"
                disabled={!selectedOption}
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

export default PageTestTwo;
