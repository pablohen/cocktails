import { useQuery } from 'react-query';
import { CategoryDTO } from '../interfaces/CategoryDTO';
import { cocktailService } from '../services/cocktail';

export function useCategories() {
  const fetchCategories = async () => {
    const res = await cocktailService.get<{ drinks: CategoryDTO[] }>(
      '/list.php?c=list'
    );

    const categories = res.data.drinks;
    return categories;
  };

  const categories = useQuery(['categories'], fetchCategories, {
    onError: (data) => console.error(data),
  });

  return {
    categories,
  };
}
