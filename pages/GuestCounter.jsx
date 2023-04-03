import { useEffect, useRef, useState } from 'react';

function GuestCounter() {
  const [numGuests, setNumGuests] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);


  const handleGuestClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleIncrement = () => {
    setNumGuests(numGuests + 1);
  };

  const handleDecrement = () => {
    setNumGuests(numGuests > 1 ? numGuests - 1 : 1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative" ref={dropdownRef}>
        <button
          className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 w-64 rounded inline-flex items-center"
          onClick={handleGuestClick}
        >
          <span className="mr-1">{numGuests} Guest</span>
          <svg
            className={`fill-current ml-32 h-4 w-4 ${showDropdown ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M15 7l-5 5-5-5 1-1 4 4 4-4 1 1z" />
          </svg>
        </button>
        {showDropdown && (
          <div className="absolute z-10 mt-2 w-64 rounded-md bg-white shadow-lg">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className='flex justify-between items-center'>
                <div>
                  <h1>Guest No.</h1>
                </div>
              <div className='flex space-x-5 justify-center items-center'>
                <button
                  className="block px-4 py-2 text-md border rounded-full hover:border-black text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <span className="">{numGuests}</span>
                <button
                  className="block px-4 py-2 text-md text-gray-700 border hover:border-black rounded-full hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuestCounter;
