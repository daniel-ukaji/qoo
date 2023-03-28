import { useDispatch } from 'react-redux';

const CategoryBoxes = ({ categories, selectedCategory, setPageSelection }) => {
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    dispatch(setPageSelection(category));
  };

  return (
    <div className="flex flex-wrap justify-center">
      {categories.map((category) => (
        <div
          key={category}
          className={`p-4 m-2 cursor-pointer ${
            selectedCategory === category ? 'bg-green-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryBoxes;
