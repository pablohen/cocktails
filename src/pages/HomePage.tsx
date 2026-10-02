import { Helmet } from "react-helmet-async";
import { Card } from "@/components/Card";
import { DrinkGrid } from "@/components/DrinkGrid";
import { useUtils } from "@/contexts/UtilsContext";
import { useDrinks } from "@/hooks/useDrinks";
import { toDrinkSummary } from "@/lib/drink";
import { CardSkeleton } from "./HomePage/CardSkeleton";
import { ErrorDisplay } from "./HomePage/ErrorDisplay";
import { FilterBar } from "./HomePage/FilterBar";
import { NoResults } from "./HomePage/NoResults";

const CARD_SKELETON_KEYS = [
	"skeleton-1",
	"skeleton-2",
	"skeleton-3",
	"skeleton-4",
	"skeleton-5",
	"skeleton-6",
	"skeleton-7",
	"skeleton-8",
] as const;

export function HomePage() {
	const { handleSelectedDrink, filters } = useUtils();
	const { data: drinks, searchResults, isLoading, isError, refetch } = useDrinks();
	const { search: searchTerm, category: selectedCategory } = filters;

	const pageTitle = searchTerm
		? `Search results for "${searchTerm}" - Cocktails & Drinks`
		: selectedCategory
			? `${selectedCategory} Cocktails - Cocktails & Drinks`
			: "Cocktails & Drinks - Discover Amazing Cocktail Recipes";

	const pageDescription = searchTerm
		? `Search results for ${searchTerm} cocktails`
		: selectedCategory
			? `Browse ${selectedCategory} cocktail recipes`
			: "Discover thousands of cocktail recipes from around the world";

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
				<meta name="description" content={pageDescription} />
			</Helmet>

			<FilterBar
				count={isLoading || isError ? null : drinks.length}
				searchResults={searchResults}
			/>

			{isLoading && (
				<DrinkGrid>
					{CARD_SKELETON_KEYS.map((key) => (
						<CardSkeleton key={key} />
					))}
				</DrinkGrid>
			)}

			{isError && <ErrorDisplay onRetry={refetch} />}

			{!isLoading && !isError && drinks.length === 0 ? (
				<NoResults filters={filters} />
			) : (
				!isLoading &&
				!isError && (
					<DrinkGrid>
						{drinks.map((drink) => {
							const summary = toDrinkSummary(drink);
							return (
								<Card
									key={summary.id}
									id={summary.id}
									name={summary.name}
									image={summary.image}
									onClick={handleSelectedDrink}
								/>
							);
						})}
					</DrinkGrid>
				)
			)}
		</>
	);
}
