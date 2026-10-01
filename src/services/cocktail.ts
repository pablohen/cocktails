import axios from "axios";
import type { Category } from "@/types/Category";
import type { Drink, DrinkListItem } from "@/types/Drink";

const API_URL = import.meta.env.VITE_API_URL || "https://www.thecocktaildb.com/api/json/v1/1";

const cocktailApi = axios.create({
	baseURL: API_URL,
});

// `null` when nothing matches, "no data found" for an unknown filter
type DrinksResponse<T> = { drinks: T[] | null | string };

function toList<T>({ drinks }: DrinksResponse<T>): T[] {
	return Array.isArray(drinks) ? drinks : [];
}

export async function getCategories(): Promise<Category[]> {
	const { data } = await cocktailApi.get<{ drinks: Category[] }>("list.php?c=list");
	return data.drinks;
}

export async function getDrinksByCategory(category: string): Promise<DrinkListItem[]> {
	const { data } = await cocktailApi.get<DrinksResponse<DrinkListItem>>("filter.php", {
		params: {
			c: category,
		},
	});
	return toList(data);
}

export async function getDrinkById(id: string): Promise<Drink | null> {
	const { data } = await cocktailApi.get<DrinksResponse<Drink>>("lookup.php", {
		params: {
			i: id,
		},
	});
	return toList(data)[0] ?? null;
}

export async function getRandomDrink(): Promise<Drink | null> {
	const { data } = await cocktailApi.get<DrinksResponse<Drink>>("random.php");
	return toList(data)[0] ?? null;
}

export async function getDrinksBySearch(searchTerm: string): Promise<Drink[]> {
	const { data } = await cocktailApi.get<DrinksResponse<Drink>>("search.php", {
		params: {
			s: searchTerm,
		},
	});
	return toList(data);
}
