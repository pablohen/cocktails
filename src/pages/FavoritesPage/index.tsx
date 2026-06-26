import { Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useUtils } from "@/contexts/UtilsContext";
import { toDrinkSummary } from "@/lib/drink";

export function FavoritesPage() {
	const { favorites } = useFavorites();
	const { handleSelectedDrink } = useUtils();
	const navigate = useNavigate();

	return (
		<>
			<Helmet>
				<title>My Favorites - Cocktails & Drinks</title>
				<meta
					name="description"
					content="View your favorite cocktail recipes."
				/>
			</Helmet>
			<div className="w-full">
				<PageHeader
					icon={Heart}
					iconClassName="bg-gradient-to-br from-red-500 to-pink-600"
					title="My Favorites"
				/>

				{favorites.length === 0 ? (
					<EmptyState
						icon={Heart}
						title="No favorites yet"
						description="Start exploring cocktails and click the heart icon to save your favorites here."
						action={
							<Button onClick={() => navigate("/")} className="mt-4">
								Browse Cocktails
							</Button>
						}
					/>
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{favorites.map((drink) => {
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
				)}
			</div>
		</>
	);
}
