import AddIcon from "@mui/icons-material/Add";
import CasinoIcon from "@mui/icons-material/Casino";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { useDynamicColors } from "@/contexts/ThemeContext";
import { useDrink } from "@/hooks/useDrink";
import { useRandomDrink } from "@/hooks/useRandomDrink";
import { extractColors } from "@/lib/colorExtractor";
import { getDrinkIngredients } from "@/lib/drink";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { DrinkDetailsSkeleton } from "./DrinkDetailsPage/DrinkDetailsSkeleton";

function SectionLabel({ children }: { children: ReactNode }) {
	return (
		<Typography
			variant="overline"
			component="h2"
			color="text.secondary"
			sx={{ display: "block", fontWeight: 600, letterSpacing: "0.08em", lineHeight: 1.6, mb: 1 }}
		>
			{children}
		</Typography>
	);
}

export function DrinkDetailsPage() {
	const drink = useDrink();
	const { setColors } = useDynamicColors();
	const { addIngredient, removeIngredient, isInList } = useShoppingList();
	const { addToHistory } = useRecentlyViewed();
	const randomDrink = useRandomDrink();
	const navigate = useNavigate();
	const [copyMessage, setCopyMessage] = useState<string | null>(null);

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
		let cancelled = false;

		if (drink.data) {
			if (drink.data.strDrinkThumb) {
				extractColors(drink.data.strDrinkThumb)
					.then((colors) => {
						if (!cancelled) setColors(colors);
					})
					.catch((error) => console.error("Failed to extract colors:", error));
			}

			addToHistory({
				id: drink.data.idDrink,
				name: drink.data.strDrink,
				image: drink.data.strDrinkThumb,
			});
		}

		return () => {
			cancelled = true;
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
		return <NotFoundPage />;
	}

	const { strDrink, strDrinkThumb, strCategory, strAlcoholic, strIBA, strGlass, strInstructions } =
		drink.data;
	const tags = [strCategory, strAlcoholic, strIBA && `IBA · ${strIBA}`].filter(
		(tag): tag is string => !!tag,
	);

	const handleAnotherDrink = async () => {
		const { data } = await randomDrink.refetch();
		if (data) {
			void navigate(`/${data.idDrink}`);
		}
	};

	const handleCopy = async () => {
		const lines = ingredients.map(
			({ name, measure }) => `- ${measure ? `${measure} ` : ""}${name}`,
		);
		try {
			await navigator.clipboard.writeText([strDrink, ...lines].join("\n"));
			setCopyMessage("Ingredients copied");
		} catch {
			setCopyMessage("Couldn't copy. Select the list instead.");
		}
	};

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
				<meta name="description" content={pageDescription} />
			</Helmet>

			<Paper
				variant="outlined"
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "5fr 6fr" },
					overflow: "hidden",
				}}
			>
				<Box
					sx={(theme) => ({
						position: "relative",
						bgcolor: alpha(theme.palette.primary.main, 0.12),
					})}
				>
					<Box
						component="img"
						src={strDrinkThumb}
						alt={`${strDrink} cocktail`}
						sx={{
							display: "block",
							width: "100%",
							height: "100%",
							aspectRatio: { xs: "4 / 3", md: "1" },
							objectFit: "cover",
						}}
					/>
					<FavoriteButton
						drink={drink.data}
						size="md"
						sx={{ position: "absolute", top: 16, right: 16 }}
					/>
				</Box>

				<Stack
					spacing={3}
					sx={{
						p: { xs: 2.5, md: 3.5 },
						borderTop: 6,
						borderColor: "primary.main",
						minWidth: 0,
					}}
				>
					<Stack spacing={1.5}>
						<Typography
							variant="h3"
							component="h1"
							sx={{ fontSize: { xs: "2rem", md: "2.4rem" }, lineHeight: 1.1 }}
						>
							{strDrink}
						</Typography>
						{tags.length > 0 && (
							<Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: "wrap" }}>
								{tags.map((tag) => (
									<Chip
										key={tag}
										label={tag}
										size="small"
										sx={(theme) => ({
											fontWeight: 600,
											bgcolor: alpha(theme.palette.primary.main, 0.14),
										})}
									/>
								))}
							</Stack>
						)}
					</Stack>

					<Box>
						<SectionLabel>Ingredients · {ingredients.length}</SectionLabel>
						<Box
							component="ul"
							sx={{ listStyle: "none", m: 0, p: 0, borderTop: 1, borderColor: "divider" }}
						>
							{ingredients.map(({ name, measure }) => {
								const inList = isInList(name);

								return (
									<Box
										component="li"
										key={name}
										sx={{
											display: "grid",
											gridTemplateColumns: "minmax(0, 1fr) auto auto",
											alignItems: "center",
											columnGap: 1.5,
											py: 0.5,
											borderBottom: 1,
											borderColor: "divider",
										}}
									>
										<Typography sx={{ fontWeight: 500, overflowWrap: "anywhere" }}>
											{name}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}
										>
											{measure || "to taste"}
										</Typography>
										<IconButton
											size="small"
											color={inList ? "success" : "default"}
											onClick={() => {
												if (inList) {
													removeIngredient(name);
												} else {
													addIngredient(name);
												}
											}}
											aria-label={
												inList
													? `Remove ${name} from shopping list`
													: `Add ${name} to shopping list`
											}
										>
											{inList ? <CheckIcon fontSize="small" /> : <AddIcon fontSize="small" />}
										</IconButton>
									</Box>
								);
							})}
						</Box>
					</Box>

					<Box>
						<SectionLabel>Method{strGlass ? ` · ${strGlass}` : ""}</SectionLabel>
						<Typography color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: "62ch" }}>
							{strInstructions}
						</Typography>
					</Box>

					<Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: "wrap", pt: 1 }}>
						<Button
							variant="contained"
							startIcon={<CasinoIcon />}
							onClick={handleAnotherDrink}
							disabled={randomDrink.isFetching}
						>
							Another random drink
						</Button>
						<Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
							Copy ingredients
						</Button>
					</Stack>
				</Stack>
			</Paper>

			<Snackbar
				open={copyMessage !== null}
				autoHideDuration={2500}
				onClose={() => setCopyMessage(null)}
				message={copyMessage}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			/>
		</>
	);
}
