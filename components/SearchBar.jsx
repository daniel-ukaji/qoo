import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

const SearchBar = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [guests, setGuests] = useState(1)
  const [showDateRangePicker, setShowDateRangePicker] = useState(false)

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
    setShowDateRangePicker(false)
  }

  return (
    <div className="bg-white rounded-full shadow-lg flex items-center">
      <button
        className="text-gray-500 hover:text-gray-800 font-medium px-6 py-4 focus:outline-none"
        onClick={() => setShowDateRangePicker(!showDateRangePicker)}
      >
        {`${startDate.toDateString()} - ${endDate.toDateString()}`}
      </button>
      <button
        className="text-gray-500 hover:text-gray-800 font-medium px-6 py-4 focus:outline-none"
        onClick={() => setShowDateRangePicker(!showDateRangePicker)}
      >
        {`Guests: ${guests}`}
      </button>
      <button
        className="bg-airbnb-red text-white hover:bg-red-600 font-medium px-6 py-4 rounded-full focus:outline-none"
      >
        Search
      </button>
      {showDateRangePicker && (
        <div className="absolute top-20 z-10 w-full">
          <div className="bg-airbnb-light-gray p-4 rounded-lg shadow-lg">
            <DateRangePicker
              ranges={[
                {
                  startDate: startDate,
                  endDate: endDate,
                  key: 'selection',
                },
              ]}
              onChange={handleSelect}
              direction="horizontal"
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              minDate={new Date()}
              rangeColors={['#FF5A5F']}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-airbnb-red text-white hover:bg-red-600 font-medium px-4 py-2 rounded-full focus:outline-none"
                onClick={() => setShowDateRangePicker(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
