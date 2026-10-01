import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DrinkGrid } from "@/components/DrinkGrid";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";

export function RecentlyViewedPage() {
	const { recentDrinks, clearHistory } = useRecentlyViewed();
	const navigate = useNavigate();

	return (
		<>
			<title>Recently Viewed - Cocktails & Drinks</title>
			<meta name="description" content="Your recently viewed cocktail recipes." />

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
						<Button onClick={() => navigate("/")} startIcon={<SearchIcon />} sx={{ mt: 2 }}>
							Browse Cocktails
						</Button>
					}
				/>
			) : (
				<DrinkGrid drinks={recentDrinks} />
			)}
		</>
	);
}
