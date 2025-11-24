import { Search, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoResultsProps {
	searchTerm: string;
	selectedCategory: string;
}

export function NoResults({ searchTerm, selectedCategory }: NoResultsProps) {
	return (
		<div className="flex min-h-[40vh] w-full flex-col items-center justify-center p-8 text-center">
			{searchTerm || selectedCategory ? (
				<>
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
				</>
			) : (
				<>
					<Wine className="mb-4 h-16 w-16 text-muted-foreground" />
					<h3 className="mb-2 font-semibold text-2xl text-muted-foreground">
						No drinks selected
					</h3>
					<p className="mb-6 max-w-md text-lg text-muted-foreground">
						Start exploring by selecting a category from above or search for
						your favorite cocktail.
					</p>
					<div className="flex gap-2 text-muted-foreground text-sm">
						<Search className="mt-0.5 h-4 w-4" />
						<span>Try searching for "Margarita" or "Mojito"</span>
					</div>
				</>
			)}
		</div>
	);
}
