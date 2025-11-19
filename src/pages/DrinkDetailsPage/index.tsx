import { AlertCircle, Heart } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useDrink } from "@/hooks/useDrink";
import { extractColors } from "@/utils/colorExtractor";

function DrinkDetailsSkeleton() {
	return (
		<main className="w-full">
			<Skeleton className="mb-6 h-12 w-64 rounded-xl sm:mb-8" />

			<div className="flex w-full flex-col gap-6 sm:gap-8 md:gap-12 lg:flex-row">
				<div className="flex flex-shrink-0 justify-center lg:justify-start">
					<div className="relative">
						<div className="-inset-1 absolute rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-lg" />
						<Skeleton className="relative aspect-square h-auto w-full max-w-[320px] rounded-2xl sm:max-w-[400px] lg:max-w-[480px]" />
					</div>
				</div>

				<div className="flex flex-1 flex-col gap-6 sm:gap-8">
					<div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg">
						<Skeleton className="mb-3 h-8 w-32 rounded-lg" />
						<Skeleton className="ml-3 h-6 w-48 rounded-lg" />
					</div>

					<div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg">
						<Skeleton className="mb-4 h-8 w-32 rounded-lg" />
						<div className="ml-3 space-y-2">
							<Skeleton className="h-6 w-40 rounded-lg" />
							<Skeleton className="h-6 w-36 rounded-lg" />
							<Skeleton className="h-6 w-44 rounded-lg" />
						</div>
					</div>

					<div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg">
						<Skeleton className="mb-4 h-8 w-32 rounded-lg" />
						<Skeleton className="ml-3 h-24 w-full rounded-lg" />
					</div>
				</div>
			</div>
		</main>
	);
}

export function DrinkDetailsPage() {
	const drink = useDrink();
	const { setColors } = useTheme();
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();

	const ingredients = useMemo(() => {
		if (drink.isLoading || drink.isError || !drink.data) {
			return [];
		}

		return Object.entries(drink.data).filter((item) =>
			item[0].startsWith("strIngredient"),
		);
	}, [drink]);

	const pageTitle = drink.data
		? `${drink.data.strDrink} - Cocktail Recipe | Cocktails & Drinks`
		: "Cocktail Recipe | Cocktails & Drinks";

	const pageDescription = drink.data
		? `Learn how to make ${drink.data.strDrink}. ${drink.data.strCategory} cocktail recipe with ingredients and instructions.`
		: "Discover cocktail recipes";

	useEffect(() => {
		document.title = pageTitle;
	}, [pageTitle]);

	useEffect(() => {
		if (drink.data?.strDrinkThumb) {
			extractColors(drink.data.strDrinkThumb)
				.then((colors) => setColors(colors))
				.catch((error) => console.error("Failed to extract colors:", error));
		}

		return () => {
			setColors(null);
		};
	}, [drink.data, setColors]);

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
				<meta name="description" content={pageDescription} />
			</Helmet>
			<main className="w-full">
				<h2 className="mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-center font-bold text-3xl text-transparent sm:mb-8 sm:text-4xl md:text-left md:text-6xl">
					{drink.data.strDrink}
				</h2>

				<div className="flex w-full flex-col gap-6 sm:gap-8 md:gap-12 lg:flex-row">
					<div className="flex flex-shrink-0 justify-center lg:justify-start">
						<div className="group relative">
							<div className="-inset-1 absolute rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-lg transition duration-300 group-hover:opacity-75" />
							<img
								src={drink.data.strDrinkThumb}
								alt={`${drink.data.strDrink} cocktail`}
								loading="lazy"
								className="relative h-auto w-full max-w-[320px] rounded-2xl shadow-2xl sm:max-w-[400px] lg:max-w-[480px]"
							/>
							<Button
								variant="ghost"
								size="icon"
								className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40 hover:text-red-500"
								onClick={() => {
									if (!drink.data) return;
									if (isFavorite(drink.data.idDrink)) {
										removeFavorite(drink.data.idDrink);
									} else {
										addFavorite(drink.data);
									}
								}}
							>
								<Heart
									className={`h-6 w-6 transition-all ${
										isFavorite(drink.data.idDrink)
											? "fill-red-500 text-red-500"
											: ""
									}`}
								/>
							</Button>
						</div>
					</div>

					<div className="flex flex-1 flex-col gap-6 sm:gap-8">
						<div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg">
							<h3 className="mb-3 flex items-center gap-2 font-bold text-primary text-xl sm:text-2xl md:text-3xl">
								<span className="h-8 w-1 rounded-full bg-gradient-to-b from-primary to-secondary" />
								Category
							</h3>
							<p className="ml-3 text-base text-muted-foreground sm:text-lg">
								{drink.data.strCategory}
							</p>
						</div>

						<div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg">
							<h3 className="mb-4 flex items-center gap-2 font-bold text-secondary text-xl sm:text-2xl md:text-3xl">
								<span className="h-8 w-1 rounded-full bg-gradient-to-b from-secondary to-accent" />
								Ingredients
							</h3>
							<ul className="ml-3 space-y-2">
								{ingredients.map((ingredient) => {
									if (!ingredient[1]) {
										return null;
									}

									return (
										<li
											key={ingredient[0]}
											className="flex items-center gap-2 text-base text-muted-foreground sm:text-lg"
										>
											<span className="h-2 w-2 rounded-full bg-accent" />
											{String(ingredient[1])}
										</li>
									);
								})}
							</ul>
						</div>

						<div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg">
							<h3 className="mb-4 flex items-center gap-2 font-bold text-accent text-xl sm:text-2xl md:text-3xl">
								<span className="h-8 w-1 rounded-full bg-gradient-to-b from-accent to-primary" />
								Instructions
							</h3>
							<p className="ml-3 text-base text-muted-foreground leading-relaxed sm:text-lg">
								{drink.data.strInstructions}
							</p>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
