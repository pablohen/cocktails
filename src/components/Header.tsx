import CasinoIcon from "@mui/icons-material/Casino";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "@/components/Category";
import { SearchBar } from "@/components/SearchBar";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { useUtils } from "@/contexts/UtilsContext";
import { useCategories } from "@/hooks/useCategories";
import { useRandomDrink } from "@/hooks/useRandomDrink";

const CATEGORY_SKELETON_KEYS = [
	"category-skeleton-1",
	"category-skeleton-2",
	"category-skeleton-3",
	"category-skeleton-4",
	"category-skeleton-5",
	"category-skeleton-6",
] as const;

interface Props {
	title: string;
}

export function Header({ title }: Props) {
	const categories = useCategories();
	const { handleSelectedCategory, handleSearch, searchTerm } = useUtils();
	const { refetch, isFetching } = useRandomDrink();
	const { ingredients } = useShoppingList();
	const navigate = useNavigate();

	const handleSurpriseMe = async () => {
		const { data } = await refetch();
		if (data) {
			void navigate(`/${data.idDrink}`);
		}
	};

	return (
		<AppBar position="sticky" color="primary">
			<Toolbar sx={{ flexWrap: "wrap", gap: 2, py: 1 }}>
				<IconButton
					color="inherit"
					onClick={handleSurpriseMe}
					disabled={isFetching}
					aria-label="Surprise me with a random cocktail"
					sx={{ mr: 1 }}
				>
					<CasinoIcon
						sx={{
							animation: isFetching ? "spin 1s linear infinite" : "none",
							"@keyframes spin": {
								"0%": { transform: "rotate(0deg)" },
								"100%": { transform: "rotate(360deg)" },
							},
						}}
					/>
				</IconButton>

				<Box
					component={Link}
					to="/"
					aria-label="Go to homepage"
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
						color: "inherit",
						textDecoration: "none",
						flexGrow: 1,
					}}
				>
					<LocalCafeIcon />
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						{title}
					</Typography>
				</Box>

				<Stack direction="row" spacing={0.5}>
					<IconButton component={Link} to="/favorites" color="inherit" aria-label="Go to favorites">
						<FavoriteIcon />
					</IconButton>

					<IconButton
						component={Link}
						to="/shopping-list"
						color="inherit"
						aria-label="Go to shopping list"
					>
						<Badge badgeContent={ingredients.length} color="error">
							<ShoppingCartIcon />
						</Badge>
					</IconButton>

					<IconButton
						component={Link}
						to="/recently-viewed"
						color="inherit"
						aria-label="Go to recently viewed"
					>
						<HistoryIcon />
					</IconButton>
				</Stack>
			</Toolbar>

			<Box sx={{ px: 2, pb: 2 }}>
				<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
					<SearchBar initialValue={searchTerm} onSubmit={handleSearch} />
				</Box>

				<Box component="nav" aria-label="Category filters">
					{categories.isLoading && (
						<Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "center" }}>
							{CATEGORY_SKELETON_KEYS.map((key) => (
								<Skeleton
									key={key}
									variant="rounded"
									width={96}
									height={32}
									sx={{ borderRadius: 16, bgcolor: "rgba(255,255,255,0.2)" }}
								/>
							))}
						</Stack>
					)}

					{categories.isError && (
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Alert severity="error" sx={{ maxWidth: 400 }}>
								Failed to load categories
							</Alert>
						</Box>
					)}

					{categories.data && (
						<Box
							component="ul"
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								gap: 1,
								listStyle: "none",
								m: 0,
								p: 0,
							}}
						>
							{categories.data.map((category) => (
								<Box component="li" key={category.strCategory}>
									<Category name={category.strCategory} onClick={handleSelectedCategory} />
								</Box>
							))}
						</Box>
					)}
				</Box>
			</Box>
		</AppBar>
	);
}
