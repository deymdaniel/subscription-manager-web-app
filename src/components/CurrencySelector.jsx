import React from "react";
import { useCurrency } from "../contexts/CurrencyContext";

const CurrencySelector = () => {
  const { currentCurrency, currencies, changeCurrency } = useCurrency();

  return (
    <div className='relative'>
      <label
        htmlFor='currency'
        className='block text-sm font-medium text-gray-700 mb-1'
      >
        Currency
      </label>
      <select
        id='currency'
        value={currentCurrency.code}
        onChange={(e) => changeCurrency(e.target.value)}
        className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm'
      >
        {Object.values(currencies).map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.symbol} {currency.name} ({currency.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
