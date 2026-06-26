import { AlertCircle, Check, Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { DetailSection } from "@/components/DetailSection";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useDrink } from "@/hooks/useDrink";
import { extractColors } from "@/lib/colorExtractor";
import { getDrinkIngredients } from "@/lib/drink";
import { cn } from "@/lib/utils";
import { DrinkDetailsSkeleton } from "./components/DrinkDetailsSkeleton";

export function DrinkDetailsPage() {
	const drink = useDrink();
	const { setColors } = useTheme();
	const { addIngredient, removeIngredient, isInList } = useShoppingList();
	const { addToHistory } = useRecentlyViewed();

	const ingredients = useMemo(() => {
		if (drink.isLoading || drink.isError || !drink.data) {
			return [];
		}
		return getDrinkIngredients(drink.data);
	}, [drink]);

	const pageTitle = drink.data
		? `${drink.data.strDrink} - Cocktail Recipe | Cocktails & Drinks`
		: "Cocktail Recipe | Cocktails & Drinks";

	const pageDescription = drink.data
		? `Learn how to make ${drink.data.strDrink}. ${drink.data.strCategory} cocktail recipe with ingredients and instructions.`
		: "Discover cocktail recipes";

	useEffect(() => {
		if (drink.data) {
			if (drink.data.strDrinkThumb) {
				extractColors(drink.data.strDrinkThumb)
					.then((colors) => setColors(colors))
					.catch((error) => console.error("Failed to extract colors:", error));
			}

			addToHistory({
				id: drink.data.idDrink,
				name: drink.data.strDrink,
				image: drink.data.strDrinkThumb,
			});
		}

		return () => {
			setColors(null);
		};
	}, [drink.data, setColors, addToHistory]);

	if (drink.isLoading) {
		return <DrinkDetailsSkeleton />;
	}

	if (drink.isError) {
		return (
			<div className="w-full">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error loading drink details</AlertTitle>
					<AlertDescription className="flex flex-col gap-2">
						<p>We couldn't load this drink's information. Please try again.</p>
						<Button
							variant="outline"
							size="sm"
							onClick={() => drink.refetch()}
							className="w-fit"
						>
							Retry
						</Button>
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (!drink.data) {
		return null;
	}

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
				<meta name="description" content={pageDescription} />
			</Helmet>
			<div className="w-full">
				<h2 className="mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-center font-bold text-3xl text-transparent sm:mb-8 sm:text-4xl md:text-left md:text-6xl">
					{drink.data.strDrink}
				</h2>

				<div className="flex w-full flex-col gap-6 sm:gap-8 md:gap-12 lg:flex-row">
					<div className="flex flex-shrink-0 justify-center lg:justify-start">
						<div className="group relative">
							<div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-lg transition duration-300 group-hover:opacity-75" />
							<img
								src={drink.data.strDrinkThumb}
								alt={`${drink.data.strDrink} cocktail`}
								loading="lazy"
								className="relative h-auto w-full max-w-[320px] rounded-2xl shadow-2xl sm:max-w-[400px] lg:max-w-[480px]"
							/>
							<FavoriteButton
								drink={drink.data}
								size="md"
								className="absolute top-4 right-4 z-20"
							/>
						</div>
					</div>

					<div className="flex flex-1 flex-col gap-6 sm:gap-8">
						<DetailSection title="Category" accent="primary">
							<p className="text-base text-muted-foreground sm:text-lg">
								{drink.data.strCategory}
							</p>
						</DetailSection>

						<DetailSection title="Ingredients" accent="secondary">
							<ul className="space-y-2">
								{ingredients.map((ingredientName) => {
									const inList = isInList(ingredientName);

									return (
										<li
											key={ingredientName}
											className="flex items-center justify-between gap-2 text-base text-muted-foreground sm:text-lg"
										>
											<div className="flex items-center gap-2">
												<span className="h-2 w-2 rounded-full bg-accent" />
												{ingredientName}
											</div>
											<Button
												variant="ghost"
												size="icon"
												className={cn(
													"h-8 w-8",
													inList
														? "text-green-500 hover:text-green-600"
														: "text-muted-foreground hover:text-primary",
												)}
												onClick={() => {
													if (inList) {
														removeIngredient(ingredientName);
													} else {
														addIngredient(ingredientName);
													}
												}}
												aria-label={
													inList
														? `Remove ${ingredientName} from shopping list`
														: `Add ${ingredientName} to shopping list`
												}
											>
												{inList ? (
													<Check className="h-4 w-4" />
												) : (
													<Plus className="h-4 w-4" />
												)}
											</Button>
										</li>
									);
								})}
							</ul>
						</DetailSection>

						<DetailSection title="Instructions" accent="accent">
							<p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
								{drink.data.strInstructions}
							</p>
						</DetailSection>
					</div>
				</div>
			</div>
		</>
	);
}
