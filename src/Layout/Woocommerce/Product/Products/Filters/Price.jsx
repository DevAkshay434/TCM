import React, { useState, useEffect } from 'react';
import FormatCurrency from '../../../../../Component/Currency/FormatCurrency';
import { TrimSymbol } from '../../../../../Component/Currency/TrimSymbol';
import './Sidebar.css';

export default function Price({ onPriceChange }) {
  const [minValue, setMinValue] = useState(() => {
    const savedMinValue = localStorage.getItem('minValue');
    return savedMinValue !== null ? Number(savedMinValue) : 0; // Default to 0 if not set
  });
  
  const [maxValue, setMaxValue] = useState(() => {
    const savedMaxValue = localStorage.getItem('maxValue');
    return savedMaxValue !== null ? Number(savedMaxValue) : 20000; // Default to 10000 if not set
  });
  
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('minValue', minValue);
    localStorage.setItem('maxValue', maxValue);
  }, [minValue, maxValue]);

  const handleMinChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value <= maxValue) {
      setMinValue(value);
      onPriceChange(value, maxValue);
      setOpen(true);
    }
  };

  const handleMaxChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= minValue) {
      setMaxValue(value);
      onPriceChange(minValue, value);
      setOpen(true);
    }
  };

  const getValidAmount = (value) => {
    const trimmedValue = TrimSymbol(value.toFixed(2));
    return isNaN(trimmedValue) ? 0 : Number(trimmedValue);
  };

  const resetFilters = () => {
    setMinValue(0);
    setMaxValue(20000);
    setOpen(false);
    onPriceChange(0, 20000); 
    localStorage.removeItem('minValue');
    localStorage.removeItem('maxValue');
  };

  useEffect(() => {
    // Ensure open state updates correctly after state changes
    if (minValue === 0 && maxValue === 20000) {
      setOpen(false);
    }
  }, [minValue, maxValue]);

  return (
    <>
      <div className="w-full range py-4">
        <div className="range-slider relative w-full h-2 bg-gray-200 rounded-full">
          <span
            className="range-selected"
            style={{
              left: `${(minValue / 10000) * 100}%`,
              right: `${100 - (maxValue / 20000) * 100}%`,
            }}
          ></span>
        </div>

        <div className="range-input mb-3 transition-all ease-in duration-75 cursor-pointer">
          <input
            type="range"
            className="min"
            min="0"
            max="20000"
            value={minValue}
            onChange={handleMinChange}
          />
          <input
            type="range"
            className="max"
            min="0"
            max="20000"
            value={maxValue}
            onChange={handleMaxChange}
          />
        </div>

        <div className="range-price flex justify-between mt-4">
          <span className="text-base text-gray-600">
            <FormatCurrency amountInINR={getValidAmount(minValue)} />
          </span>
          <span className="text-base text-gray-600">
            <FormatCurrency amountInINR={getValidAmount(maxValue)} />
          </span>
        </div>
      </div>
      {open && (
        <button
          onClick={resetFilters}
          className="bg-blues transition text-white px-4 py-2 rounded-md mt-4 w-full"
        >
          Reset
        </button>
      )}
    </>
  );
}
