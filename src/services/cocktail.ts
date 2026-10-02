import axios from "axios";
import type { Category } from "@/types/Category";
import type { Drink } from "@/types/Drink";

const API_URL = import.meta.env.VITE_API_URL || "https://www.thecocktaildb.com/api/json/v1/1";

const cocktailApi = axios.create({
	baseURL: API_URL,
});

// `null` when nothing matches, "no data found" for an unknown filter
type DrinksResponse = { drinks: Drink[] | null | string };

export async function getCategories() {
	return await cocktailApi.get<{ drinks: Category[] }>("list.php?c=list");
}

export async function getDrinksByCategory(category: string) {
	return await cocktailApi.get<DrinksResponse>("filter.php", {
		params: {
			c: category,
		},
	});
}

export async function getDrinksByAlcoholic(alcoholic: string) {
	return await cocktailApi.get<DrinksResponse>("filter.php", {
		params: {
			a: alcoholic,
		},
	});
}

export async function getDrinkById(id: string) {
	return await cocktailApi.get<DrinksResponse>("lookup.php", {
		params: {
			i: id,
		},
	});
}

export async function getRandomDrink() {
	return await cocktailApi.get<DrinksResponse>("random.php");
}

export async function getDrinksBySearch(searchTerm: string) {
	return await cocktailApi.get<DrinksResponse>("search.php", {
		params: {
			s: searchTerm,
		},
	});
}
