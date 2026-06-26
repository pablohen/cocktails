import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { DetailSection } from "@/components/DetailSection";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { useDynamicColors } from "@/contexts/ThemeContext";
import { useDrink } from "@/hooks/useDrink";
import { extractColors } from "@/lib/colorExtractor";
import { getDrinkIngredients } from "@/lib/drink";
import { DrinkDetailsSkeleton } from "./DrinkDetailsPage/DrinkDetailsSkeleton";

export function DrinkDetailsPage() {
	const drink = useDrink();
	const { setColors } = useDynamicColors();
	const { addIngredient, removeIngredient, isInList } = useShoppingList();
	const { addToHistory } = useRecentlyViewed();

	const ingredients = useMemo(() => {
		if (drink.isLoading || drink.isError || !drink.data) {
			return [];
		}
		return getDrinkIngredients(drink.data);
	}, [drink]);

	const pageTitle = drink.data
		? `${drink.data.strDrink} - Cocktail Recipe | Cocktails & Drinks`
		: "Cocktail Recipe | Cocktails & Drinks";

	const pageDescription = drink.data
		? `Learn how to make ${drink.data.strDrink}. ${drink.data.strCategory} cocktail recipe with ingredients and instructions.`
		: "Discover cocktail recipes";

	useEffect(() => {
		if (drink.data) {
			if (drink.data.strDrinkThumb) {
				extractColors(drink.data.strDrinkThumb)
					.then((colors) => setColors(colors))
					.catch((error) => console.error("Failed to extract colors:", error));
			}

			addToHistory({
				id: drink.data.idDrink,
				name: drink.data.strDrink,
				image: drink.data.strDrinkThumb,
			});
		}

		return () => {
			setColors(null);
		};
	}, [drink.data, setColors, addToHistory]);

	if (drink.isLoading) {
		return <DrinkDetailsSkeleton />;
	}

	if (drink.isError) {
		return (
			<Alert
				severity="error"
				action={
					<Button color="inherit" size="small" onClick={() => drink.refetch()}>
						Retry
					</Button>
				}
			>
				<AlertTitle>Error loading drink details</AlertTitle>
				We couldn't load this drink's information. Please try again.
			</Alert>
		);
	}

	if (!drink.data) {
		return null;
	}

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
				<meta name="description" content={pageDescription} />
			</Helmet>

			<Typography
				variant="h3"
				sx={{
					fontWeight: 700,
					mb: 4,
					textAlign: { xs: "center", md: "left" },
				}}
			>
				{drink.data.strDrink}
			</Typography>

			<Grid container spacing={4}>
				<Grid size={{ xs: 12, lg: 5 }}>
					<Box
						sx={{
							position: "relative",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Box
							component="img"
							src={drink.data.strDrinkThumb}
							alt={`${drink.data.strDrink} cocktail`}
							loading="lazy"
							sx={{
								width: "100%",
								maxWidth: 480,
								borderRadius: 2,
								boxShadow: 3,
							}}
						/>
						<FavoriteButton
							drink={drink.data}
							size="md"
							sx={{ position: "absolute", top: 16, right: 16 }}
						/>
					</Box>
				</Grid>

				<Grid size={{ xs: 12, lg: 7 }}>
					<Stack spacing={3}>
						<DetailSection title="Category" accent="primary">
							<Typography variant="body1" color="text.secondary">
								{drink.data.strCategory}
							</Typography>
						</DetailSection>

						<DetailSection title="Ingredients" accent="secondary">
							<List disablePadding>
								{ingredients.map((ingredientName) => {
									const inList = isInList(ingredientName);

									return (
										<ListItem
											key={ingredientName}
											disableGutters
											secondaryAction={
												<IconButton
													edge="end"
													color={inList ? "success" : "default"}
													onClick={() => {
														if (inList) {
															removeIngredient(ingredientName);
														} else {
															addIngredient(ingredientName);
														}
													}}
													aria-label={
														inList
															? `Remove ${ingredientName} from shopping list`
															: `Add ${ingredientName} to shopping list`
													}
												>
													{inList ? <CheckIcon /> : <AddIcon />}
												</IconButton>
											}
										>
											<ListItemText primary={ingredientName} />
										</ListItem>
									);
								})}
							</List>
						</DetailSection>

						<DetailSection title="Instructions" accent="accent">
							<Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
								{drink.data.strInstructions}
							</Typography>
						</DetailSection>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
}
