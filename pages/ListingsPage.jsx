import { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const currencyOptions = [
  { value: "USD", label: "$ USD" },
  { value: "EUR", label: "€ EUR" },
  { value: "JPY", label: "¥ JPY" },
  // Add more currency options as needed
];

export default function MoneyInputField() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(currencyOptions[0].value);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="flex items-center mt-20">
      <div className="relative">
        <select
          className="appearance-none border border-gray-300 rounded-l px-3 py-2 bg-white text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          value={currency}
          onChange={handleCurrencyChange}
        >
          {currencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <IoIosArrowDown className="text-gray-400" />
        </div>
      </div>
      <div className="relative">
        <input
          className="appearance-none border border-gray-300 rounded-r px-3 py-2 bg-white text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
          <FaDollarSign className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
