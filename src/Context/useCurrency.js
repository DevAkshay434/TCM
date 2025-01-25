import React, { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState("INR");
  const [conversionRate, setConversionRate] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [countryData, setCountryData] = useState([]); // Store country information
  const [countryNames, setCountryNames] = useState([]); // Store country information
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  // Fetch currency conversion rates
  useEffect(() => {
    const fetchConversion = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/INR`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setConversionRate(data.rates);
        setCurrencies(Object.keys(data.rates)); // List of currency codes
      } catch (error) {
        console.log("Error fetching Currencies", error.message || error);
      }
    };
    fetchConversion();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const officialCurrencyCountries = {
          USD: "United States", // Prioritize USA for USD
          AUD: "Australia",     // Prioritize Australia for AUD
          CAD: "Canada",        // Prioritize Canada for CAD
          GBP: "United Kingdom",// Prioritize UK for GBP
          EUR: "European Union",// Prioritize EU for EUR
          // Add other specific currency-country mappings if needed
        };

        const currencyCountryMap = {};

        // Loop through all countries to populate the currency-country mapping
        data.forEach((country) => {
          if (country.currencies) {
            const currencyCodes = Object.keys(country.currencies);
            currencyCodes.forEach((code) => {
              const isOfficialIssuer = officialCurrencyCountries[code] === country.name.common;

              // If this currency code hasn't been mapped yet, or if this country is the official issuer
              if (!currencyCountryMap[code] || isOfficialIssuer) {
                currencyCountryMap[code] = {
                  name: country.name.common,
                  value: code,
                  label: country.currencies[code].name,
                  flag: country.flags.svg,
                };
              }
            });
          }
        });

        // Add INR as the default currency
        const defaultCurrency = {
          name: "India",
          value: "INR",
          label: "Indian Rupee",
          flag: "https://flagcdn.com/w320/in.png",
        };

        // Combine the default INR with the mapped currencies from the API
        const updatedCountryData = [defaultCurrency, ...Object.values(currencyCountryMap)];
        const countryName= [...Object.values(currencyCountryMap)]
      setCountryData(updatedCountryData);

      // Now set the countryNames based on the countryData
      setCountryNames(countryName.map(country => ({
        value: country.value,
        label: country.name,  // Use country name for the label
      })));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
      finally {
        setIsLoadingCountries(false); // Ensure loading state is updated
      }
    };

    fetchCountries();
  }, []);
  

  return (
    <CurrencyContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        conversionRate,
        currencies,
        isLoadingCountries,
        countryData,
        countryNames // Pass country data to context
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
