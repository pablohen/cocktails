import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface UtilsContextData {
  selectedCategory: string;
  searchTerm: string;
  handleSearch: (term: string) => void;
  handleSelectedCategory: (category: string) => void;
  handleSelectedDrink: (drink: string) => void;
}

const UtilsContext = createContext({} as UtilsContextData);

export function UtilsProvider({ children }: Props) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(term: string) {
    setSelectedCategory('');
    setSearchTerm(term);
    navigate('/');
  }

  function handleSelectedCategory(category: string) {
    setSearchTerm('');
    setSelectedCategory(category);
    navigate('/');
  }

  function handleSelectedDrink(drink: string) {
    navigate(`/${drink}`);
  }

  return (
    <UtilsContext.Provider
      value={{
        selectedCategory,
        searchTerm,
        handleSearch,
        handleSelectedCategory,
        handleSelectedDrink,
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
}

export function useUtils() {
  const context = useContext(UtilsContext);

  return context;
}
