import { Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useUtils } from "@/stores/utils";

export function FavoritesPage() {
	const { favorites } = useFavorites();
	const { handleSelectedDrink } = useUtils();

	return (
		<>
			<Helmet>
				<title>My Favorites - Cocktails & Drinks</title>
				<meta
					name="description"
					content="View your favorite cocktail recipes."
				/>
			</Helmet>
			<main className="w-full">
				<div className="mb-8 flex items-center gap-3">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
						<Heart className="h-6 w-6 fill-white text-white" />
					</div>
					<h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-bold text-3xl text-transparent sm:text-4xl md:text-5xl">
						My Favorites
					</h1>
				</div>

				{favorites.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
						<div className="rounded-full bg-muted p-6">
							<Heart className="h-12 w-12 text-muted-foreground" />
						</div>
						<h2 className="font-bold text-2xl">No favorites yet</h2>
						<p className="max-w-md text-muted-foreground">
							Start exploring cocktails and click the heart icon to save your
							favorites here.
						</p>
						<Button
							onClick={() => {
								window.location.href = "/";
							}}
							className="mt-4"
						>
							Browse Cocktails
						</Button>
					</div>
				) : (
					<div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
						{favorites.map((drink) => (
							<Card
								key={drink.idDrink}
								id={drink.idDrink}
								name={drink.strDrink}
								image={drink.strDrinkThumb}
								onClick={handleSelectedDrink}
							/>
						))}
					</div>
				)}
			</main>
		</>
	);
}
