import { Helmet } from "react-helmet-async";
import { Card } from "@/components/Card";
import { useUtils } from "@/contexts/UtilsContext";
import { useDrinks } from "@/hooks/useDrinks";
import { toDrinkSummary } from "@/lib/drink";
import { CardSkeleton } from "./components/CardSkeleton";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { NoResults } from "./components/NoResults";

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
	const { handleSelectedDrink, selectedCategory, searchTerm } = useUtils();
	const { data: drinks, isLoading, isError } = useDrinks();

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
			<div className="w-full">
				{isLoading && (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{CARD_SKELETON_KEYS.map((key) => (
							<CardSkeleton key={key} />
						))}
					</div>
				)}

				{isError && <ErrorDisplay />}

				{!isLoading && !isError && (!drinks || drinks.length === 0) ? (
					<NoResults
						searchTerm={searchTerm}
						selectedCategory={selectedCategory}
					/>
				) : (
					!isLoading &&
					!isError && (
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{drinks?.map((drink) => {
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
						</div>
					)
				)}
			</div>
		</>
	);
}
