import React ,{useState} from 'react';
import { GET_COLLECTION } from '../../../../../Queries/Queries';
import { useQuery } from '@apollo/client';


const Category = ({ item, onCategorySelect  }) => {
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const { data, loading, error } = useQuery(GET_COLLECTION, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });
  if(loading ||error ){ return null}
  const collectionCounts = data.productCategories.edges.reduce((acc, edge) => {
    const { name, count } = edge.node;
    acc[name] = count; // Map the collection name to its count
    return acc;
  }, {});
  const handleCheckboxChange = (category) => {
    // Deselect if the same category is selected, else select the new one
    const newSelectedCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newSelectedCategory); // Update the selected category

    onCategorySelect(newSelectedCategory);
  };
  
  return (
    <>
      {item.filter.map((el, itemIndex) => (
        <li className="flex items-center justify-center pl-11" key={itemIndex}>
          <input type="checkbox"   checked={selectedCategory === el.filtertext} // Only check the selected category
            onChange={() => handleCheckboxChange(el.filtertext)}/>
          <button className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"  onClick={() => handleCheckboxChange(el.filtertext)} >
          <p className=' text-base font-normal '> {el.filtertext}
          {collectionCounts[el.filtertext] !== undefined
                ? ` (${collectionCounts[el.filtertext]})`
                : ''}
            </p> 
          </button>
        </li>
      ))}

    </>
  );
}

export default Category;
