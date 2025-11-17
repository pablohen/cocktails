import { AlertCircle, Search, Wine } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDrinks } from "@/hooks/useDrinks";
import { useUtils } from "@/stores/utils";

function CardSkeleton() {
	return (
		<div className="w-64 space-y-0 overflow-hidden rounded-lg border-2 bg-gradient-to-br from-card to-card/80 shadow-lg backdrop-blur-sm">
			<Skeleton className="h-64 w-full rounded-none" />
			<div className="relative bg-gradient-to-br from-primary via-secondary to-accent p-4">
				<div className="absolute inset-0 bg-black/40" />
				<Skeleton className="relative z-10 h-6 w-32 bg-white/30" />
			</div>
		</div>
	);
}

export function HomePage() {
	const drinks = useDrinks();
	const { handleSelectedDrink, selectedCategory, searchTerm } = useUtils();

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
				{drinks.isLoading &&
					Array.from({ length: 6 }).map(() => (
						<CardSkeleton key={crypto.randomUUID()} />
					))}

				{drinks.isError && (
					<div className="w-full max-w-2xl">
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>Error loading drinks</AlertTitle>
							<AlertDescription className="flex flex-col gap-2">
								<p>We couldn't load the drinks. Please try again.</p>
								<Button
									variant="outline"
									size="sm"
									onClick={() => drinks.refetch()}
									className="w-fit"
								>
									Retry
								</Button>
							</AlertDescription>
						</Alert>
					</div>
				)}

				{!drinks.isLoading && !drinks.isError && !drinks.data ? (
					<div className="flex min-h-[40vh] w-full flex-col items-center justify-center p-8 text-center">
						<Wine className="mb-4 h-16 w-16 text-muted-foreground/50" />
						<h3 className="mb-2 font-semibold text-2xl">No drinks selected</h3>
						<p className="mb-6 max-w-md text-lg text-muted-foreground">
							Start exploring by selecting a category from above or search for
							your favorite cocktail.
						</p>
						<div className="flex gap-2 text-muted-foreground text-sm">
							<Search className="mt-0.5 h-4 w-4" />
							<span>Try searching for "Margarita" or "Mojito"</span>
						</div>
					</div>
				) : !drinks.isLoading &&
					!drinks.isError &&
					drinks.data &&
					drinks.data.length === 0 ? (
					<div className="flex min-h-[40vh] w-full flex-col items-center justify-center p-8 text-center">
						<Search className="mb-4 h-16 w-16 text-muted-foreground/50" />
						<h3 className="mb-2 font-semibold text-2xl">No results found</h3>
						<p className="mb-6 max-w-md text-lg text-muted-foreground">
							{searchTerm
								? `We couldn't find any cocktails matching "${searchTerm}". Try a different search term.`
								: selectedCategory
									? `No cocktails found in the ${selectedCategory} category.`
									: "No cocktails found. Try a different search or category."}
						</p>
						<Button
							onClick={() => {
								window.location.href = "/";
							}}
							variant="outline"
						>
							Clear filters
						</Button>
					</div>
				) : (
					!drinks.isError &&
					drinks.data?.map((drink) => (
						<Card
							key={drink.idDrink}
							id={drink.idDrink}
							name={drink.strDrink}
							image={drink.strDrinkThumb}
							onClick={handleSelectedDrink}
						/>
					))
				)}
			</div>
		</>
	);
}
