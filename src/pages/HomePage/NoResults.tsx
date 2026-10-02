import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type Filters, useUtils } from "@/contexts/UtilsContext";

interface NoResultsProps {
	filters: Filters;
}

function describeFilters({ search, category, alcoholic, refine }: Filters) {
	return [
		search && `"${search}"`,
		category,
		alcoholic === "Alcoholic" && "alcoholic",
		alcoholic === "Non_Alcoholic" && "non-alcoholic",
		search && refine && `refined by "${refine}"`,
	]
		.filter(Boolean)
		.join(", ");
}

export function NoResults({ filters }: NoResultsProps) {
	const { clearFilters } = useUtils();
	const description = describeFilters(filters);

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
			<SearchIcon sx={{ fontSize: 64, color: "text.disabled" }} />
			<Typography variant="h5" sx={{ fontWeight: 600 }}>
				No drinks match
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
				{description
					? `No drinks match ${description}. Try removing a filter.`
					: "No drinks found. Try a different search or category."}
			</Typography>
			<Button variant="outlined" onClick={clearFilters}>
				Clear filters
			</Button>
		</Stack>
	);
}
