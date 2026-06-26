import { History, Search } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
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
			<div className="w-full">
				<PageHeader
					icon={History}
					iconClassName="bg-gradient-to-br from-blue-500 to-purple-600"
					title="Recently Viewed"
					action={
						recentDrinks.length > 0 ? (
							<Button
								variant="ghost"
								onClick={clearHistory}
								className="text-muted-foreground hover:text-destructive"
							>
								Clear History
							</Button>
						) : undefined
					}
				/>

				{recentDrinks.length === 0 ? (
					<EmptyState
						icon={History}
						title="No recently viewed drinks"
						description="You haven't viewed any cocktails yet. Start exploring to see your history here."
						action={
							<Button onClick={() => navigate("/")} className="mt-4">
								<Search className="mr-2 h-4 w-4" />
								Browse Cocktails
							</Button>
						}
					/>
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{recentDrinks.map((drink) => (
							<Card
								key={drink.id}
								id={drink.id}
								name={drink.name}
								image={drink.image}
								onClick={handleSelectedDrink}
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
}
