/** @format */

import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoadContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const LoadContext = () => {
  return useContext(LoaderContext);
};
