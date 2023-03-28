import { useState } from "react";

function ToggleButton() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = async () => {
    setIsChecked(!isChecked);
    try {
      const response = await fetch("api/toggle", {
        method: "POST",
        body: JSON.stringify({ isChecked: !isChecked }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={handleToggle}
          />
          <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
          <div
            className={`${
              isChecked ? "bg-green-500 translate-x-6" : "translate-x-1"
            } absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transition`}
          ></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">Toggle Button</div>
      </label>
    </div>
  );
}

export default ToggleButton;
