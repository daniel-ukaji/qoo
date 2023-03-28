import { useState } from 'react';
import Avatar from '../public/images/Avatar.png'
import Image from 'next/image';


const Table = () => {
  const [filter, setFilter] = useState('all');

  const myImageObject = {
    src: '/../public/images/Avatar.png',
    alt: 'image',
    width: 30,
    height: 30,
}

const [data, setData] = useState([  
  { id: 1, isChecked: false, picture: <Image {...myImageObject} /> , name: 'Olivia Rhye', phonenumber: '09111223344', email: 'example@email.com', property: 'Product Designer', guests: '3', night: '1', checkedIn: '08-02-2023' },
  { id: 2, isChecked: false, picture: <Image {...myImageObject} /> , name: 'Phoenix Baker', phonenumber: '09111223344', email: 'example@email.com', property: 'Product Designer', guests: '1', night: '5', checkedIn: '08-02-2023' },
  { id: 3, isChecked: false, picture: <Image {...myImageObject} /> , name: 'Lana Steiner', phonenumber: '09111223344', email: 'example@email.com', property: 'Backend Developer', guests: '4', night: '10', checkedIn: '08-02-2023' },
  { id: 4, isChecked: false, picture: <Image {...myImageObject} /> , name: 'Olivia Rhye', phonenumber: '09111223344', email: 'example@email.com', property: 'Backend Developer', guests: '1', night: '3', checkedIn: '08-02-2023' },
  { id: 5, isChecked: false, picture: <Image {...myImageObject} /> , name: 'Candice Wu', phonenumber: '09111223344', email: 'example@email.com', property: 'Fullstack Developer', guests: '2', night: '6', checkedIn: '08-02-2023' },
]);

const handleCheckboxChange = (event, itemId) => {
    if (itemId === 'selectAll') {
      // Handle "select all" checkbox change
      const updatedItems = data.map((item) => ({ ...item, isChecked: event.target.checked }))
      setData(updatedItems)
    } else {
      // Handle individual checkbox change
      const updatedItems = data.map((item) =>
        item.id === itemId ? { ...item, isChecked: event.target.checked } : item
      )
      setData(updatedItems)
    }
  }

  const selectAllChecked = data.every((item) => item.isChecked)

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredData = filter === 'all' ? data : data.filter((item) => item.property === filter);

  return (
    <div className="table-container">
      <div className="inline-flex rounded-md border divide-x mb-4">
        <button
          className={`px-4 py-2 cursor-pointer rounded-l-md ${
            filter === 'all' ? 'bg-[#DB5461] text-white' : 'bg-[#FFFFFF] text-gray-700'
          }`}
          onClick={() => handleFilterChange('all')}
        >
          Currently Hosting (0)
        </button>
        <button
          className={`px-4 py-2  cursor-pointer divide-x rounded-l-none ${
            filter === 'Product Designer' ? 'bg-[#DB5461] text-white' : 'bg-[#FFFFFF] text-gray-700'
          }`}
          onClick={() => handleFilterChange('Product Designer')}
        >
          Reservations (0)
        </button>
        <button
          className={`px-4 py-2  cursor-pointer rounded-l-none ${
            filter === 'Backend Developer' ? 'bg-[#DB5461] text-white' : 'bg-[#FFFFFF] text-gray-700'
          }`}
          onClick={() => handleFilterChange('Backend Developer')}
        >
          Checking out (0)
        </button>
        <button
          className={`px-4 py-2  cursor-pointer rounded-r-md rounded-l-none bg-[#FFFFFF]`}
        //   onClick={() => handleFilterChange('category2')}
        >
          Arriving Today (0)
        </button>
        <button
          className={`px-4 py-2  cursor-pointer rounded-r-md rounded-l-none bg-[#FFFFFF]`}
        
        >
          Pending (0)
        </button>
      </div>
      <table className="w-full border-collapse border rounded-md border-gray-300">
        <thead>
          <tr className="">

          {/* <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
            
          </th> */}
            <th className="flex items-center text-sm gap-2 px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
            <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={(event) => handleCheckboxChange(event, 'selectAll')}
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
            />
              Name
            </th>
            <th className="px-6 text-sm py-3 text-left font-medium  text-gray-500 tracking-wider">
              Phone number
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Property
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Guest
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Nights
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Checked in
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-150">
          {filteredData.map((item) => (
            <tr key={item.id} className=''>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 font-bold">
                <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={(event) => handleCheckboxChange(event, item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
                />
                {item.picture} {item.name}
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.phonenumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.property}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.guests}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.night}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.checkedIn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
