/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../apis/cocktail";
import { CategoryDTO } from "../interfaces/CategoryDTO";
import { DrinkDTO } from "../interfaces/DrinkDTO";

interface GetDrink {
  id: string;
}

export function useCocktail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "";
  const searchTerm = searchParams.get("q") ?? "";

  function getCategories() {
    async function query() {
      const res = await api.get<{ drinks: CategoryDTO[] }>("/list.php?c=list");

      const categories = res.data.drinks;
      return categories;
    }

    return useQuery({ queryKey: ["categories"], queryFn: query });
  }

  function getDrinks() {
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

    return useQuery<DrinkDTO[]>({
      queryKey: ["drinks", selectedCategory, searchTerm],
      queryFn: () => {
        if (Boolean(searchTerm)) {
          return fetchSearch(searchTerm);
        }

        return fetchDrinks(selectedCategory);
      },
      enabled: Boolean(selectedCategory) || Boolean(searchTerm),
      onError: (data) => console.error(data),
    });
  }

  function getDrink({ id }: GetDrink) {
    async function query() {
      const res = await api.get<{ drinks: DrinkDTO[] }>("lookup.php", {
        params: {
          i: id,
        },
      });

      const drink = res.data.drinks;
      return drink[0];
    }

    return useQuery<DrinkDTO>({
      queryKey: ["drink", id],
      queryFn: query,
      enabled: Boolean(id),
      onError: (data) => console.error(data),
    });
  }

  function handleSearch(q: string) {
    navigate({
      pathname: "/",
      search: `q=${q}`,
    });
  }

  function handleSelectedCategory(category: string) {
    navigate({
      pathname: "/",
      search: `category=${category}`,
    });
  }

  function handleSelectedDrink(id: string) {
    navigate({ pathname: `/drinks/${id}` });
  }

  return {
    getCategories,
    getDrinks,
    getDrink,
    handleSearch,
    handleSelectedCategory,
    handleSelectedDrink,
    selectedCategory,
  };
}
