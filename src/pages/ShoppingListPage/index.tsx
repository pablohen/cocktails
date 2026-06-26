import { ShoppingCart, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { DetailSection } from "@/components/DetailSection";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useShoppingList } from "@/contexts/ShoppingListContext";

export function ShoppingListPage() {
	const { ingredients, removeIngredient, clearList } = useShoppingList();
	const navigate = useNavigate();

	return (
		<>
			<Helmet>
				<title>Shopping List - Cocktails & Drinks</title>
				<meta
					name="description"
					content="Manage your shopping list for cocktail ingredients."
				/>
			</Helmet>
			<div className="w-full">
				<PageHeader
					icon={ShoppingCart}
					iconClassName="bg-gradient-to-br from-green-500 to-emerald-600"
					title="Shopping List"
					action={
						ingredients.length > 0 ? (
							<Button
								variant="destructive"
								onClick={clearList}
								className="flex items-center gap-2"
							>
								<Trash2 className="h-4 w-4" />
								Clear List
							</Button>
						) : undefined
					}
				/>

				{ingredients.length === 0 ? (
					<EmptyState
						icon={ShoppingCart}
						title="Your list is empty"
						description="Add ingredients from cocktail recipes to your shopping list."
						action={
							<Button onClick={() => navigate("/")} className="mt-4">
								Browse Cocktails
							</Button>
						}
					/>
				) : (
					<DetailSection title="Ingredients" accent="secondary">
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
					</DetailSection>
				)}
			</div>
		</>
	);
}
