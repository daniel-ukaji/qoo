import { useState } from "react";

function EditPage() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("Page Title");

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = async () => {
    try {
      const response = await fetch("/api/updateTitle", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      setTitle(data.title);
      setIsEditingTitle(false);
    } catch (error) {
      console.error(error);
      // Show error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className={`${isEditingTitle ? "hidden" : ""} text-2xl font-bold mb-2`}>
        {title}
      </h1>
      {isEditingTitle && (
        <div className="editable mb-2">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
          />
          <div className="mt-2 flex justify-between">
            <button
              onClick={handleTitleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            <button
              onClick={() => {
                setTitle("Page Title");
                setIsEditingTitle(false);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className={`${isEditingTitle ? "hidden" : ""}`}>
        <button
          onClick={handleTitleEdit}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none focus:shadow-outline"
        >
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.05 4.94a3 3 0 00-4.24 0l-6.12 6.12a1 1 0 00-.29.63l-.68 3.42a1 1 0 001.18 1.18l3.42-.68a1 1 0 00.63-.29l6.12-6.12a3 3 0 000-4.24zM7.41 13l4.95-4.95 1.34 1.34L8.75 14H7.41zM14.05 6.35a1 1 0 010 1.41l-1.83 1.83-2.12-2.12 1.83-1.83a1 1 0 011.41 0z"
              clipRule="evenodd"
            />
          </svg>
          Edit Title
        </button>
      </div>
    </div>
  );
}

export default EditPage;
