import CasinoIcon from "@mui/icons-material/Casino";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { useUtils } from "@/contexts/UtilsContext";
import { useRandomDrink } from "@/hooks/useRandomDrink";

interface Props {
	title: string;
}

const barButtonSx = {
	borderRadius: 999,
	borderColor: "rgba(255,255,255,0.5)",
	fontWeight: 600,
	"&:hover": { borderColor: "common.white", bgcolor: "rgba(255,255,255,0.14)" },
} as const;

export function Header({ title }: Props) {
	const { filters, updateFilters } = useUtils();
	const { refetch, isFetching } = useRandomDrink();
	const { ingredients } = useShoppingList();
	const navigate = useNavigate();
	const theme = useTheme();
	const isCompact = useMediaQuery(theme.breakpoints.down("sm"));

	const handleSearch = useCallback(
		(search: string) => {
			updateFilters({ search, refine: "" });
		},
		[updateFilters],
	);

	const handleSurpriseMe = async () => {
		const { data } = await refetch();
		if (data) {
			void navigate(`/${data.idDrink}`);
		}
	};

	const diceIcon = (
		<CasinoIcon
			sx={{
				animation: isFetching ? "spin 1s linear infinite" : "none",
				"@keyframes spin": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			}}
		/>
	);

	return (
		<AppBar position="sticky" color="primary">
			<Toolbar sx={{ flexWrap: "wrap", columnGap: 2, rowGap: 1, py: 1.25 }}>
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
						mr: "auto",
					}}
				>
					<LocalCafeIcon />
					<Typography variant="h6" sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>
						{title}
					</Typography>
				</Box>

				<Box sx={{ order: { xs: 3, md: 0 }, flex: "1 1 280px", maxWidth: { md: 460 } }}>
					<SearchBar initialValue={filters.search} onSubmit={handleSearch} />
				</Box>

				<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
					{isCompact ? (
						<>
							<IconButton
								component={Link}
								to="/favorites"
								color="inherit"
								aria-label="Go to favorites"
							>
								<FavoriteIcon />
							</IconButton>
							<IconButton
								color="inherit"
								onClick={handleSurpriseMe}
								disabled={isFetching}
								aria-label="Surprise me with a random cocktail"
							>
								{diceIcon}
							</IconButton>
						</>
					) : (
						<>
							<Button
								component={Link}
								to="/favorites"
								color="inherit"
								variant="outlined"
								startIcon={<FavoriteIcon />}
								aria-label="Go to favorites"
								sx={barButtonSx}
							>
								Favorites
							</Button>
							<Button
								color="inherit"
								variant="outlined"
								startIcon={diceIcon}
								onClick={handleSurpriseMe}
								disabled={isFetching}
								aria-label="Surprise me with a random cocktail"
								sx={barButtonSx}
							>
								Surprise me
							</Button>
						</>
					)}

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
		</AppBar>
	);
}
