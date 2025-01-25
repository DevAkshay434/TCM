import React, { useState } from 'react';

const Sizes = ({ item }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Toggle size selection
  const handleSelection = (filtertext) => {
    setSelectedSizes((prev) =>
      prev.includes(filtertext)
        ? prev.filter((size) => size !== filtertext) // Deselect if already selected
        : [...prev, filtertext] // Add if not selected
    );
  };

  return (
    <>
      {item.filter.map((items, itemIndex) => (
        <li className="flex items-center justify-center pl-11" key={itemIndex}>
          <input
            type="checkbox"
            checked={selectedSizes.includes(items.filtertext)}
            onChange={() => handleSelection(items.filtertext)}
          />
          <button
            className={`flex items-center w-full p-2 text-base font-normal transition duration-75 rounded-lg group `}
            onClick={() => handleSelection(items.filtertext)}
          >
            {items.filtertext}
          </button>
        </li>
      ))}
    </>
  );
};

export default Sizes;
