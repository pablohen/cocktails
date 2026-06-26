import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
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

			<PageHeader
				icon={FavoriteIcon}
				iconColor="error.main"
				title="My Favorites"
			/>

			{favorites.length === 0 ? (
				<EmptyState
					icon={FavoriteIcon}
					title="No favorites yet"
					description="Start exploring cocktails and click the heart icon to save your favorites here."
					action={
						<Button onClick={() => navigate("/")} sx={{ mt: 2 }}>
							Browse Cocktails
						</Button>
					}
				/>
			) : (
				<Grid container spacing={3}>
					{favorites.map((drink) => {
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
			)}
		</>
	);
}
