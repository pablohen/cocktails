import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/Card";
import { useDrinks } from "@/hooks/useDrinks";
import { useUtils } from "@/stores/utils";
import { CardSkeleton } from "./components/CardSkeleton";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { NoResults } from "./components/NoResults";

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

	useEffect(() => {
		document.title = pageTitle;
	}, [pageTitle]);

	return (
		<>
			<Helmet>
				<meta name="description" content={pageDescription} />
			</Helmet>
			<div className="flex flex-wrap justify-center gap-4">
				{isLoading &&
					Array.from({ length: 8 }).map(() => (
						<CardSkeleton key={crypto.randomUUID()} />
					))}

				{isError && <ErrorDisplay />}

				{!isLoading && !isError && (!drinks || drinks.length === 0) ? (
					<NoResults
						searchTerm={searchTerm}
						selectedCategory={selectedCategory}
					/>
				) : (
					<div className="w-full">
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{drinks?.map((drink) => (
								<Card
									key={drink.idDrink}
									id={drink.idDrink}
									name={drink.strDrink}
									image={drink.strDrinkThumb}
									onClick={handleSelectedDrink}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
