  import { useQuery } from '@apollo/client'
  import React from 'react'
  import { GET_COLLECTION } from '../../../Queries/Queries'
  import { NavLink } from 'react-router-dom';

  const Category = ({ closedropdown}) => {
    const { loading, error, data } = useQuery(GET_COLLECTION, {
 fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-only'
    });

    if (loading) return null;
    if (error) return null;

    let category = data?.productCategories?.edges || [];

    const sortedCategories = [...category].sort((a, b) => a.node.menuOrder - b.node.menuOrder);
    return (
      <div className='max-h-96 w-full overflow-y-auto thin'>
        <div className="flex flex-col lg:flex-row justify-between relative">
          {/* Sidebar with sticky position */}
          <div className='w-full xl:p-4 lg:p-4 p-2'>
          <div className='sticky top-0'>
                    <div className="text-sm text-gray-700 " aria-labelledby="dropdownLargeButton">
                      <h6 className="font-medium text-center lg:text-start text-sm text-gray-500 mb-2">Popular Categories</h6>
                      {sortedCategories.slice(1,4).map((el,index)=>
                      (
                      <div key={index}>
                        <NavLink to={`${el.node.uri}`} 
                  onClick={closedropdown} className="py-3 transition-all duration-500 hover:bg-gray-50 hover:rounded-xl flex items-center ">
                        <div className=" w-12 h-12 flex items-center justify-center">
                          <img src={el.node.image.sourceUrl} alt={el.node.image.altText}/>
                          </div>
                        <div className="ml-4 w-4/5">
                            <h5 className="text-gray-900 text-base mb-1.5 font-semibold">{el.node.name} </h5>
                            {el.node.description && (
    <p className="text-xs font-medium text-gray-400">{el.node.description}</p>
                            )}
                          
                          </div>
                        </NavLink>
                      </div>
                      ))}
                      
                    </div>
                    </div>  
          </div>

          {/* Categories */}
          <div className="bg-gray-50 lg:rounded-none rounded-lg xl:p-8 lg:p-4 p-2 lg:w-1/2">
            <h6 className="font-medium text-sm text-center lg:text-start text-gray-500 mb-2">All Categories</h6>
            <div className="grid grid-cols-2 lg:grid-cols-2">
            {category.map((el, index) => (
              <NavLink onClick={closedropdown} 
                className="flex col-span-1 lg:col-span-2 items-center gap-x-3.5 py-2 px-3 text-sm lg:text-base 2xl:text-lg hover:bg-blues hover:text-white transition duration-300 ease-in mt-2 text-gray-800"
                to={el.node.uri}
                key={index}
              >
                {el.node.name}
              </NavLink>
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Category;

