// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCount } from "../store";

// const Count = () => {
//   const count = useSelector((state) => state.count);
//   const dispatch = useDispatch();

//   const increment = () => {
//     dispatch(setCount(count + 1));
//   };

//   const decrement = () => {
//     dispatch(setCount(count - 1));
//   };

//   const handleChange = (event) => {
//     dispatch(setCount(parseInt(event.target.value)));
//   };

//   const handleNextClick = () => {
//     dispatch({ type: 'SET_PAGE_NUMBER', payload: 13 });
// };

//   return (
//     <div className="flex flex-col items-center">
//       <button
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         onClick={increment}
//       >
//         +
//       </button>
//       <input
//         className="text-center w-12 mt-2"
//         type="number"
//         value={count}
//         onChange={handleChange}
//       />
//       <button
//         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
//         onClick={decrement}
//       >
//         -
//       </button>
//       <button
//                 className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200"
//                 // disabled={!setValue}
//                 onClick={handleNextClick}
//               >
//                 Next
//               </button>
//     </div>
//   );
// };

// export default Count;
