import React from 'react';
import { useCurrency } from '../../Context/useCurrency';

const FormatCurrency = ({ amountInINR }) => {
  const { selectedCountry: selectedCurrency, conversionRate: conversionRates } = useCurrency();

  const convertAndFormatCurrency = (amount, currency) => {
    const rate = conversionRates[currency] ; // Default to 1 if no conversion rate available
    const convertedAmount = amount * rate;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency , // Fallback to INR if currency is not defined
    }).format(convertedAmount);
  };

  return <span>{convertAndFormatCurrency(amountInINR, selectedCurrency)}</span>;
};

export default FormatCurrency;
