import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
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
  const history = useHistory();

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedDrink('');
    history.push('/');
  };

  const handleSelectedDrink = (drink: string) => {
    setSelectedDrink(drink);
    history.push('/details');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await cocktailService.get<any>('/list.php?c=list');
        const categories: CategoryDTO[] = res.data.drinks;
        setCategories(categories);
      } catch (error) {
        throw new Error('Não foi possível buscar as categorias.');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDrinks = async (category: string) => {
      try {
        const res = await cocktailService.get<any>('/filter.php', {
          params: {
            c: category,
          },
        });

        const drinks: DrinkDTO[] = res.data.drinks;
        setDrinks(drinks);
      } catch (error) {
        throw new Error('Não foi possível buscar os drinks.');
      }
    };

    if (!!selectedCategory) {
      fetchDrinks(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchDrink = async (id: string) => {
      try {
        const res = await cocktailService.get<any>('lookup.php', {
          params: {
            i: id,
          },
        });

        const drink: DrinkDTO[] = res.data.drinks;
        setDrink(drink[0]);
      } catch (error) {
        throw new Error('Não foi possível buscar os detalhes desse drink.');
      }
    };

    !!selectedDrink && fetchDrink(selectedDrink);
  }, [selectedDrink]);

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
