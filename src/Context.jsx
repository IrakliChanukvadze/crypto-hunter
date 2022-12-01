import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

const ContextProvider = (props) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Context.Provider value={{ currency, symbol, setCurrency }}>
      {props.children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
