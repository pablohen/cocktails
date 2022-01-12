import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedDrink('');
    setDrink({} as DrinkDTO);
    history.push('/');
  };

  const handleSelectedDrink = (drink: string) => {
    setSelectedDrink(drink);
    history.push(`/details/${drink}`);
  };

  const handleSearchByTerm = (term: string) => {
    setSelectedCategory('');
    setSelectedDrink('');
    setSearchTerm(term);
    history.push('/');
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
      console.log('Could not fetch drinks.');
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
      console.log('Could not fetch categories.');
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
      console.log('Could not search.');
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
      onError: (data) => console.log(data),
      useErrorBoundary: true,
    }
  );

  const { isLoading: isLoadingSearch } = useQuery(
    ['drinks', searchTerm],
    fetchSearch,
    {
      onSuccess: (data) => setDrinks(data),
      onError: (data) => console.log(data),
      useErrorBoundary: true,
    }
  );

  const { isLoading: isLoadingDrinks } = useQuery(
    ['drinks', selectedCategory],
    () => fetchDrinks(selectedCategory),
    {
      onSuccess: (data) => setDrinks(data),
      onError: (data) => console.log(data),
      useErrorBoundary: true,
    }
  );

  const { isLoading: isLoadingDrink } = useQuery(
    ['drink', selectedDrink],
    () => fetchDrink(selectedDrink),
    {
      onSuccess: (data) => setDrink(data),
      onError: (data) => console.log(data),
      useErrorBoundary: true,
    }
  );

  useEffect(() => {
    setLoading(
      isLoadingCategories ||
        isLoadingDrink ||
        isLoadingDrinks ||
        isLoadingSearch
    );
  }, [isLoadingCategories, isLoadingDrink, isLoadingDrinks, isLoadingSearch]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await cocktailService.get<any>('/list.php?c=list');
  //       const categories: CategoryDTO[] = res.data.drinks;
  //       setCategories(categories);
  //     } catch (error) {
  //       throw new Error('Não foi possível buscar as categorias.');
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  // useEffect(() => {
  //   const fetchDrinks = async (category: string) => {
  //     try {
  //       const res = await cocktailService.get<any>('/filter.php', {
  //         params: {
  //           c: category,
  //         },
  //       });

  //       const drinks: DrinkDTO[] = res.data.drinks;
  //       setDrinks(drinks);
  //     } catch (error) {
  //       throw new Error('Não foi possível buscar os drinks.');
  //     }
  //   };

  //   if (!!selectedCategory) {
  //     fetchDrinks(selectedCategory);
  //   }
  // }, [selectedCategory]);

  // useEffect(() => {
  //   const fetchSearch = async () => {
  //     try {
  //       const res = await cocktailService.get<any>('/search.php', {
  //         params: {
  //           s: searchTerm,
  //         },
  //       });

  //       const drinks: DrinkDTO[] = res.data.drinks;
  //       setDrinks(drinks ?? []);
  //     } catch (error) {
  //       throw new Error('Não foi possível efetuar a busca.');
  //     }
  //   };

  //   fetchSearch();
  // }, [searchTerm]);

  // useEffect(() => {
  //   const fetchDrink = async (id: string) => {
  //     try {
  //       const res = await cocktailService.get<any>('lookup.php', {
  //         params: {
  //           i: id,
  //         },
  //       });

  //       const drink: DrinkDTO[] = res.data.drinks;
  //       setDrink(drink[0]);
  //     } catch (error) {
  //       throw new Error('Não foi possível buscar os detalhes desse drink.');
  //     }
  //   };

  //   !!selectedDrink && fetchDrink(selectedDrink);
  // }, [selectedDrink]);

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