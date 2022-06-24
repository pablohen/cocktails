import { useQuery } from 'react-query';
import { DrinkDTO } from '../interfaces/DrinkDTO';
import { cocktailService } from '../services/cocktail';

export function useDrink(selectedDrink: string) {
  const fetchDrink = async (id: string) => {
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
  };

  const drink = useQuery<DrinkDTO>(
    ['drink', selectedDrink],
    () => fetchDrink(selectedDrink),
    {
      onError: (data) => console.error(data),
      enabled: !!selectedDrink,
    }
  );

  return {
    drink,
  };
}
