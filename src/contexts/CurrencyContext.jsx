import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

const CURRENCIES = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    rate: 1, // Base currency
  },
  PHP: {
    code: "PHP",
    symbol: "₱",
    name: "Philippine Peso",
    rate: 58.5, // 1 USD = 58.5 PHP (approximate rate)
  },
};

export const CurrencyProvider = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    // Load saved currency from localStorage or default to USD
    try {
      const saved = localStorage.getItem("selectedCurrency");
      return saved ? JSON.parse(saved) : CURRENCIES.USD;
    } catch (error) {
      console.error("Error loading currency from localStorage:", error);
      return CURRENCIES.USD;
    }
  });

  useEffect(() => {
    // Save currency preference to localStorage
    try {
      localStorage.setItem("selectedCurrency", JSON.stringify(currentCurrency));
    } catch (error) {
      console.error("Error saving currency to localStorage:", error);
    }
  }, [currentCurrency]);

  const convertAmount = (
    amount,
    fromCurrency = "USD",
    toCurrency = currentCurrency.code
  ) => {
    if (fromCurrency === toCurrency) return amount;

    // Convert to USD first if needed
    const usdAmount =
      fromCurrency === "USD" ? amount : amount / CURRENCIES[fromCurrency].rate;

    // Convert from USD to target currency
    return toCurrency === "USD"
      ? usdAmount
      : usdAmount * CURRENCIES[toCurrency].rate;
  };

  const formatAmount = (amount, currencyCode = currentCurrency.code) => {
    const currency = CURRENCIES[currencyCode];
    return `${currency.symbol}${amount.toFixed(2)}`;
  };

  const changeCurrency = (currencyCode) => {
    if (CURRENCIES[currencyCode]) {
      setCurrentCurrency(CURRENCIES[currencyCode]);
    }
  };

  const value = {
    currentCurrency,
    currencies: CURRENCIES,
    convertAmount,
    formatAmount,
    changeCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
