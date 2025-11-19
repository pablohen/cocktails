import { ShoppingCart, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useShoppingList } from "@/contexts/ShoppingListContext";

export function ShoppingListPage() {
	const { ingredients, removeIngredient, clearList } = useShoppingList();

	return (
		<>
			<Helmet>
				<title>Shopping List - Cocktails & Drinks</title>
				<meta
					name="description"
					content="Manage your shopping list for cocktail ingredients."
				/>
			</Helmet>
			<main className="w-full">
				<div className="mb-8 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
							<ShoppingCart className="h-6 w-6 text-white" />
						</div>
						<h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-bold text-3xl text-transparent sm:text-4xl md:text-5xl">
							Shopping List
						</h1>
					</div>
					{ingredients.length > 0 && (
						<Button
							variant="destructive"
							onClick={clearList}
							className="flex items-center gap-2"
						>
							<Trash2 className="h-4 w-4" />
							Clear List
						</Button>
					)}
				</div>

				{ingredients.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
						<div className="rounded-full bg-muted p-6">
							<ShoppingCart className="h-12 w-12 text-muted-foreground" />
						</div>
						<h2 className="font-bold text-2xl">Your list is empty</h2>
						<p className="max-w-md text-muted-foreground">
							Add ingredients from cocktail recipes to your shopping list.
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
					<div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-6 shadow-lg">
						<ul className="divide-y divide-border">
							{ingredients.map((ingredient) => (
								<li
									key={ingredient}
									className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
								>
									<span className="font-medium text-lg">{ingredient}</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removeIngredient(ingredient)}
										className="text-muted-foreground hover:text-destructive"
										aria-label={`Remove ${ingredient} from list`}
									>
										<Trash2 className="h-5 w-5" />
									</Button>
								</li>
							))}
						</ul>
					</div>
				)}
			</main>
		</>
	);
}
