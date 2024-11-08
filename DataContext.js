import React, { createContext, useState } from 'react';

// Create the context
export const DataContext = createContext();

// Create the provider component
export const DataProvider = ({ children }) => {
    const [transDate,setTransDate]=useState(new Date())



  return (
    <DataContext.Provider value={{ transDate,setTransDate }}>
      {children}
    </DataContext.Provider>
  );
};