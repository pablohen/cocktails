import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { DetailSection } from "@/components/DetailSection";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
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

			<PageHeader
				icon={ShoppingCartIcon}
				iconColor="success.main"
				title="Shopping List"
				action={
					ingredients.length > 0 ? (
						<Button
							color="error"
							variant="contained"
							startIcon={<DeleteIcon />}
							onClick={clearList}
						>
							Clear List
						</Button>
					) : undefined
				}
			/>

			{ingredients.length === 0 ? (
				<EmptyState
					icon={ShoppingCartIcon}
					title="Your list is empty"
					description="Add ingredients from cocktail recipes to your shopping list."
					action={
						<Button onClick={() => navigate("/")} sx={{ mt: 2 }}>
							Browse Cocktails
						</Button>
					}
				/>
			) : (
				<DetailSection title="Ingredients" accent="secondary">
					<List disablePadding>
						{ingredients.map((ingredient) => (
							<ListItem
								key={ingredient}
								disableGutters
								divider
								secondaryAction={
									<IconButton
										edge="end"
										color="error"
										onClick={() => removeIngredient(ingredient)}
										aria-label={`Remove ${ingredient} from list`}
									>
										<DeleteIcon />
									</IconButton>
								}
							>
								<ListItemText
									primary={
										<Typography variant="body1" sx={{ fontWeight: 500 }}>
											{ingredient}
										</Typography>
									}
								/>
							</ListItem>
						))}
					</List>
				</DetailSection>
			)}
		</>
	);
}
