import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CategoryDTO } from "../interfaces/CategoryDTO";
import { DrinkDTO } from "../interfaces/DrinkDTO";
import { cocktailService } from "../services/cocktail";
import { useUtils } from "../stores/utils";

export function useCocktails() {
  function Categories() {
    const fetchCategories = async () => {
      const res = await cocktailService.get<{ drinks: CategoryDTO[] }>(
        "/list.php?c=list"
      );

      const categories = res.data.drinks;
      return categories;
    };

    return useQuery(["categories"], fetchCategories, {
      onError: (data) => console.error(data),
    });
  }

  function Drinks() {
    const { selectedCategory, searchTerm } = useUtils();

    async function fetchDrinks(category: string) {
      const res = await cocktailService.get<{ drinks: DrinkDTO[] }>(
        "/filter.php",
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
        "/search.php",
        {
          params: {
            s: searchTerm,
          },
        }
      );

      const drinks = res.data.drinks;
      return drinks;
    }

    return useQuery<DrinkDTO[]>(
      ["drinks", selectedCategory, searchTerm],
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
  }

  function Drink() {
    const { drinkId } = useParams();

    const selectedDrink = drinkId as string;

    const fetchDrink = async (id: string) => {
      const res = await cocktailService.get<{ drinks: DrinkDTO[] }>(
        "lookup.php",
        {
          params: {
            i: id,
          },
        }
      );

      const drink = res.data.drinks;
      return drink[0];
    };

    return useQuery<DrinkDTO>(
      ["drink", selectedDrink],
      () => fetchDrink(selectedDrink),
      {
        onError: (data) => console.error(data),
        enabled: !!selectedDrink,
      }
    );
  }

  return { categories: Categories(), drinks: Drinks(), drink: Drink() };
}
