import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useUtils } from "@/contexts/UtilsContext";

export function RecentlyViewedPage() {
	const { recentDrinks, clearHistory } = useRecentlyViewed();
	const { handleSelectedDrink } = useUtils();
	const navigate = useNavigate();

	return (
		<>
			<Helmet>
				<title>Recently Viewed - Cocktails & Drinks</title>
				<meta
					name="description"
					content="Your recently viewed cocktail recipes."
				/>
			</Helmet>

			<PageHeader
				icon={HistoryIcon}
				iconColor="info.main"
				title="Recently Viewed"
				action={
					recentDrinks.length > 0 ? (
						<Button color="error" variant="text" onClick={clearHistory}>
							Clear History
						</Button>
					) : undefined
				}
			/>

			{recentDrinks.length === 0 ? (
				<EmptyState
					icon={HistoryIcon}
					title="No recently viewed drinks"
					description="You haven't viewed any cocktails yet. Start exploring to see your history here."
					action={
						<Button
							onClick={() => navigate("/")}
							startIcon={<SearchIcon />}
							sx={{ mt: 2 }}
						>
							Browse Cocktails
						</Button>
					}
				/>
			) : (
				<Grid container spacing={3}>
					{recentDrinks.map((drink) => (
						<Grid key={drink.id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
							<Card
								id={drink.id}
								name={drink.name}
								image={drink.image}
								onClick={handleSelectedDrink}
							/>
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
}
