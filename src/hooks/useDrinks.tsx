import { useQuery } from 'react-query';
import { useUtils } from '../stores/utils';
import { DrinkDTO } from '../interfaces/DrinkDTO';
import { cocktailService } from '../services/cocktail';

export function useDrinks() {
  const { selectedCategory, searchTerm } = useUtils();

  async function fetchDrinks(category: string) {
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
  }

  async function fetchSearch(searchTerm: string) {
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
  }

  const drinks = useQuery<DrinkDTO[]>(
    ['drinks', selectedCategory, searchTerm],
    () => {
      if (!!searchTerm) {
        return fetchSearch(searchTerm);
      }

      return fetchDrinks(selectedCategory);
    },
    {
      onError: (data) => console.error(data),
      enabled: !!selectedCategory || !!searchTerm,
    }
  );

  return {
    drinks,
  };
}
