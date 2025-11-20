import { History, Search } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useUtils } from "@/stores/utils";

export function RecentlyViewedPage() {
	const { recentDrinks, clearHistory } = useRecentlyViewed();
	const { handleSelectedDrink } = useUtils();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Recently Viewed - Cocktails & Drinks";
	}, []);

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="Your recently viewed cocktail recipes."
				/>
			</Helmet>
			<main className="w-full">
				<div className="mb-8 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
							<History className="h-6 w-6 text-white" />
						</div>
						<h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-bold text-3xl text-transparent sm:text-4xl md:text-5xl">
							Recently Viewed
						</h1>
					</div>
					{recentDrinks.length > 0 && (
						<Button
							variant="ghost"
							onClick={clearHistory}
							className="text-muted-foreground hover:text-destructive"
						>
							Clear History
						</Button>
					)}
				</div>

				{recentDrinks.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
						<div className="rounded-full bg-muted p-6">
							<History className="h-12 w-12 text-muted-foreground" />
						</div>
						<h2 className="font-bold text-2xl">No recently viewed drinks</h2>
						<p className="max-w-md text-muted-foreground">
							You haven't viewed any cocktails yet. Start exploring to see your
							history here.
						</p>
						<Button onClick={() => navigate("/")} className="mt-4">
							<Search className="mr-2 h-4 w-4" />
							Browse Cocktails
						</Button>
					</div>
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
			</main>
		</>
	);
}
