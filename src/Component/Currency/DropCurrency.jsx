import React from 'react';
import Select from 'react-select';
import { useCurrency } from '../../Context/useCurrency';

const DropCurrency = () => {
  const { selectedCountry, setSelectedCountry, countryData } = useCurrency();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.hasValue ? 'transparent' : 'white', // Transparent for selected, white for placeholder
      color: state.hasValue ? 'white' : 'black',
      border: 'none',
      '&:hover': {
        borderColor: 'black', // Hover effect
        outline: 'none',
      },
      boxShadow: state.isFocused ? '0 0 0 1px black' : 'none',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.hasValue ? 'white' : 'black', // White text for the selected option
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white', // White background for dropdown menu
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : 'white', 
      color: 'black', // Black text for all options in the dropdown
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'white', // Light grey on hover
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
      fontSize:'14px' // Black placeholder with transparency
    }),
    input: (provided) => ({
      ...provided,
      color: 'black', // Black text color for the input
    }),
  };

  return (
    <div className="flex flex-col bg-transparent items-center space-y-2">
      <Select
        options={countryData} // The countryData array from context
        onChange={(selectedOption) => setSelectedCountry(selectedOption.value)} 
        value={countryData.find((option) => option.value === selectedCountry)} 
        className="w-auto  text-black z-50 h-[35px]" 
        getOptionLabel={(e) => (
          <div className="flex items-center country-option">
            <img src={e.flag} alt={e.label} className="w-5 lg:w-6 mr-3" height="20" width="20" /> 
           <p className='text-sm'> {e.label} ({e.value}) </p> 
          </div>
        )}
        getOptionValue={(e) => e.value} // Use the currency value as the unique key
        placeholder="Select a country" // Placeholder text
        styles={customStyles} // Apply the custom styles
      />
    </div>
  );
};

export default DropCurrency;
