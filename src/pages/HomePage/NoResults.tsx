import SearchIcon from "@mui/icons-material/Search";
import WineBarIcon from "@mui/icons-material/WineBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useUtils } from "@/contexts/UtilsContext";

interface NoResultsProps {
	searchTerm: string;
	selectedCategory: string;
}

export function NoResults({ searchTerm, selectedCategory }: NoResultsProps) {
	const { handleSearch, handleSelectedCategory } = useUtils();

	const handleClearFilters = () => {
		handleSearch("");
		handleSelectedCategory("");
	};

	return (
		<Stack
			spacing={2}
			sx={{
				alignItems: "center",
				justifyContent: "center",
				minHeight: "40vh",
				py: 8,
				textAlign: "center",
			}}
		>
			{searchTerm || selectedCategory ? (
				<>
					<SearchIcon sx={{ fontSize: 64, color: "text.disabled" }} />
					<Typography variant="h5" sx={{ fontWeight: 600 }}>
						No results found
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ maxWidth: 400 }}
					>
						{searchTerm
							? `We couldn't find any cocktails matching "${searchTerm}". Try a different search term.`
							: selectedCategory
								? `No cocktails found in the ${selectedCategory} category.`
								: "No cocktails found. Try a different search or category."}
					</Typography>
					<Button variant="outlined" onClick={handleClearFilters}>
						Clear filters
					</Button>
				</>
			) : (
				<>
					<WineBarIcon sx={{ fontSize: 64, color: "text.secondary" }} />
					<Typography
						variant="h5"
						sx={{ fontWeight: 600, color: "text.secondary" }}
					>
						No drinks selected
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ maxWidth: 400 }}
					>
						Start exploring by selecting a category from above or search for
						your favorite cocktail.
					</Typography>
					<Stack
						direction="row"
						spacing={1}
						sx={{ alignItems: "center", color: "text.secondary" }}
					>
						<SearchIcon fontSize="small" />
						<Typography variant="body2">
							Try searching for "Margarita" or "Mojito"
						</Typography>
					</Stack>
				</>
			)}
		</Stack>
	);
}
