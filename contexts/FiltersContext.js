import React, { createContext, useState } from "react";

const filtersContextInitialState = {
  lists: { day: [], tmima: [], teacher: [] },
  filtersOrder: {
    filter1: "day",
    filter2: "teacher",
    detailType: "tmima",
  },
  tmimaGroup: true,
};

const FiltersContext = createContext();

const useFilters = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const handleFilters = (value) => {
    setFilters(value);
  };
  return { filters: filters, onFiltersChange: handleFilters };
};

const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState(filtersContextInitialState);
  return (
    <FiltersContext.Provider value={[filters, setFilters]}>
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersProvider, useFilters };
