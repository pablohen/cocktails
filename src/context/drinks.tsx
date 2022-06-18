import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { CategoryDTO } from '../interfaces/CategoryDTO';
import { DrinkDTO } from '../interfaces/DrinkDTO';
import cocktailService from '../services/cocktail';

interface Props {
  children: ReactNode;
}

interface CocktailContextData {
  categories: CategoryDTO[];
  selectedCategory: string;
  drinks: DrinkDTO[];
  drink: DrinkDTO;
  isSelectedDrink: boolean;
  handleSelectedCategory: (category: string) => void;
  handleSelectedDrink: (drink: string) => void;
  handleSearchByTerm: (term: string) => void;
  setSelectedDrink: (id: string) => void;
  loading: boolean;
}

const CocktailContext = createContext({} as CocktailContextData);

const CocktailProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<CategoryDTO[]>(
    [] as CategoryDTO[]
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [drinks, setDrinks] = useState<DrinkDTO[]>([] as DrinkDTO[]);
  const [selectedDrink, setSelectedDrink] = useState<string>('');
  const [drink, setDrink] = useState<DrinkDTO>({} as DrinkDTO);
  const [isSelectedDrink] = useState<boolean>(!!selectedDrink.length);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedDrink('');
    setDrink({} as DrinkDTO);
    navigate('/');
  };

  const handleSelectedDrink = (drink: string) => {
    setSelectedDrink(drink);
    navigate(`/details/${drink}`);
  };

  const handleSearchByTerm = (term: string) => {
    setSelectedCategory('');
    setSelectedDrink('');
    setSearchTerm(term);
    navigate('/');
  };

  const fetchDrinks = async (category: string) => {
    try {
      const res = await cocktailService.get<{ drinks: DrinkDTO[] }>(
        '/filter.php',
        {
          params: {
            c: category,
          },
        }
      );

      const drinks = res.data.drinks;
      return drinks;
    } catch (error) {
      console.error('Could not fetch drinks.');
      return [];
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await cocktailService.get<{ drinks: CategoryDTO[] }>(
        '/list.php?c=list'
      );

      const categories = res.data.drinks;
      return categories;
    } catch (error) {
      console.error('Could not fetch categories.');
      return [];
    }
  };

  const fetchSearch = async () => {
    try {
      const res = await cocktailService.get<{ drinks: DrinkDTO[] }>(
        '/search.php',
        {
          params: {
            s: searchTerm,
          },
        }
      );

      const drinks = res.data.drinks;
      return drinks;
    } catch (error) {
      console.error('Could not search.');
      return [];
    }
  };

  const fetchDrink = async (id: string) => {
    if (id) {
      const res = await cocktailService.get<{ drinks: DrinkDTO[] }>(
        'lookup.php',
        {
          params: {
            i: id,
          },
        }
      );

      const drink = res.data.drinks;
      return drink[0];
    }

    return {} as DrinkDTO;
  };

  const { isLoading: isLoadingCategories } = useQuery(
    ['categories'],
    fetchCategories,
    {
      onSuccess: (data) => setCategories(data),
      onError: (data) => console.error(data),
    }
  );

  const { isLoading: isLoadingSearch } = useQuery(
    ['drinks', searchTerm],
    fetchSearch,
    {
      onSuccess: (data) => setDrinks(data),
      onError: (data) => console.error(data),
    }
  );

  const { isLoading: isLoadingDrinks } = useQuery(
    ['drinks', selectedCategory],
    () => fetchDrinks(selectedCategory),
    {
      onSuccess: (data) => setDrinks(data),
      onError: (data) => console.error(data),
    }
  );

  const { isLoading: isLoadingDrink } = useQuery(
    ['drink', selectedDrink],
    () => fetchDrink(selectedDrink),
    {
      onSuccess: (data) => setDrink(data),
      onError: (data) => console.error(data),
    }
  );

  useEffect(() => {
    const currentLoadingState =
      isLoadingCategories ||
      isLoadingDrink ||
      isLoadingDrinks ||
      isLoadingSearch;
    setLoading(currentLoadingState);
  }, [isLoadingCategories, isLoadingDrink, isLoadingDrinks, isLoadingSearch]);

  // useEffect(() => {
  //   console.log(loading);
  // }, [loading]);

  return (
    <CocktailContext.Provider
      value={{
        categories,
        selectedCategory,
        drinks,
        drink,
        isSelectedDrink,
        handleSelectedCategory,
        handleSelectedDrink,
        handleSearchByTerm,
        setSelectedDrink,
        loading,
      }}
    >
      {children}
    </CocktailContext.Provider>
  );
};

const useCocktail = () => {
  const context = useContext(CocktailContext);

  return context;
};

export { CocktailProvider, useCocktail };
