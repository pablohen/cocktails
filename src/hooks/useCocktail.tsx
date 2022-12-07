/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../apis/cocktail";
import { CategoryDTO } from "../interfaces/CategoryDTO";
import { DrinkDTO } from "../interfaces/DrinkDTO";
import { useUtils } from "../stores/utils";

export function useCocktail() {
  function getCategories() {
    async function query() {
      const res = await api.get<{ drinks: CategoryDTO[] }>("/list.php?c=list");

      const categories = res.data.drinks;
      return categories;
    }

    return useQuery({ queryKey: ["categories"], queryFn: query });
  }

  function getDrinks() {
    const { selectedCategory, searchTerm } = useUtils();

    async function fetchDrinks(category: string) {
      const res = await api.get<{ drinks: DrinkDTO[] }>("/filter.php", {
        params: {
          c: category,
        },
      });

      const drinks = res.data.drinks;
      return drinks;
    }

    async function fetchSearch(searchTerm: string) {
      const res = await api.get<{ drinks: DrinkDTO[] }>("/search.php", {
        params: {
          s: searchTerm,
        },
      });

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

  function getDrink() {
    const { drinkId } = useParams();

    const selectedDrink = drinkId as string;

    async function query(id: string) {
      const res = await api.get<{ drinks: DrinkDTO[] }>("lookup.php", {
        params: {
          i: id,
        },
      });

      const drink = res.data.drinks;
      return drink[0];
    }

    return useQuery<DrinkDTO>({
      queryKey: ["drink", selectedDrink],
      queryFn: () => query(selectedDrink),
      onError: (data) => console.error(data),
      enabled: !!selectedDrink,
    });
  }

  return { getCategories, getDrinks, getDrink };
}
