import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/Card";
import { useUtils } from "@/contexts/UtilsContext";
import { useDrinks } from "@/hooks/useDrinks";
import { toDrinkSummary } from "@/lib/drink";
import { CardSkeleton } from "./HomePage/CardSkeleton";
import { ErrorDisplay } from "./HomePage/ErrorDisplay";
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

			{isLoading && (
				<Grid container spacing={3}>
					{CARD_SKELETON_KEYS.map((key) => (
						<Grid key={key} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
							<CardSkeleton />
						</Grid>
					))}
				</Grid>
			)}

			{isError && <ErrorDisplay />}

			{!isLoading && !isError && (!drinks || drinks.length === 0) ? (
				<NoResults searchTerm={searchTerm} selectedCategory={selectedCategory} />
			) : (
				!isLoading &&
				!isError && (
					<Grid container spacing={3}>
						{drinks?.map((drink) => {
							const summary = toDrinkSummary(drink);
							return (
								<Grid key={summary.id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
									<Card
										id={summary.id}
										name={summary.name}
										image={summary.image}
										onClick={handleSelectedDrink}
									/>
								</Grid>
							);
						})}
					</Grid>
				)
			)}
		</>
	);
}
