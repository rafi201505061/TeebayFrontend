/* eslint-disable react/prop-types */
import { createContext, useMemo, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

  const categoryOptions = useMemo(() => {
    return categories.map((item) => ({ label: item.title, value: item.id }));
  }, [categories]);
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((item) => (map[item.id] = item));
    return map;
  }, [categories]);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        categories,
        setCategories,
        categoryOptions,
        categoryMap,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
