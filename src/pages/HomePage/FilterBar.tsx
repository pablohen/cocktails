import AppsIcon from "@mui/icons-material/Apps";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useRef, useState } from "react";
import { PhotoPill } from "@/components/PhotoPill";
import { type AlcoholicFilter, useUtils } from "@/contexts/UtilsContext";
import { useCategories } from "@/hooks/useCategories";
import type { DrinkListItem } from "@/hooks/useDrinks";
import { useStickyOffset } from "@/hooks/useStickyOffset";
import { getCategoryPhoto } from "@/lib/categoryPhotos";
import { getRefinements, type Refinement } from "@/lib/refinements";

const DEFAULT_CATEGORY = "Cocktail";

const CATEGORY_SKELETON_KEYS = [
	"category-skeleton-1",
	"category-skeleton-2",
	"category-skeleton-3",
	"category-skeleton-4",
	"category-skeleton-5",
	"category-skeleton-6",
] as const;

interface Props {
	count: number | null;
	searchResults: DrinkListItem[];
}

export function FilterBar({ count, searchResults }: Props) {
	const categories = useCategories();
	const { filters, updateFilters } = useUtils();

	const hasFilters = !!(filters.search || filters.category || filters.alcoholic);
	const activeRefine = filters.search ? filters.refine : "";

	const refinements = useMemo(() => {
		if (!filters.search) {
			return [];
		}
		const found = getRefinements(searchResults, filters.search);
		// Keep a refine word from the URL clearable even when it isn't a suggestion
		if (activeRefine && !found.some(({ word }) => word === activeRefine)) {
			const label = activeRefine.charAt(0).toUpperCase() + activeRefine.slice(1);
			const stale: Refinement = { word: activeRefine, label, image: "", count: 0 };
			return [stale, ...found];
		}
		return found;
	}, [searchResults, filters.search, activeRefine]);
	const selectedCategory = hasFilters ? filters.category : DEFAULT_CATEGORY;

	const offset = useStickyOffset();
	const sentinelRef = useRef<HTMLDivElement>(null);
	const [isStuck, setIsStuck] = useState(false);
	const [pillRow, setPillRow] = useState<HTMLUListElement | null>(null);
	const [pillRowOverflows, setPillRowOverflows] = useState(false);

	// The sentinel sits just above the bar; once it scrolls under the app bar, the bar is stuck
	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => setIsStuck(!entry.isIntersecting && entry.boundingClientRect.top < offset),
			{ rootMargin: `-${offset + 1}px 0px 0px 0px` },
		);
		observer.observe(sentinel);

		return () => observer.disconnect();
	}, [offset]);

	useEffect(() => {
		if (!pillRow) {
			return;
		}

		const observer = new ResizeObserver(() => {
			setPillRowOverflows(pillRow.scrollWidth > pillRow.clientWidth);
		});
		observer.observe(pillRow);

		return () => observer.disconnect();
	}, [pillRow]);

	const handleCategory = (category: string) => {
		updateFilters({ category: category === filters.category ? "" : category });
	};

	return (
		<>
			<Box ref={sentinelRef} aria-hidden sx={{ height: 1 }} />
			<Stack
				spacing={1.5}
				component="section"
				aria-label="Filters"
				sx={(theme) => ({
					position: "sticky",
					top: offset,
					zIndex: theme.zIndex.appBar - 1,
					mb: 3,
					mx: { xs: -2, sm: -3 },
					px: { xs: 2, sm: 3 },
					py: 1.5,
					bgcolor: alpha(theme.palette.background.default, 0.92),
					backdropFilter: "blur(8px)",
					borderBottom: 1,
					borderColor: isStuck ? "divider" : "transparent",
					transition: "border-color 0.2s",
				})}
			>
				<Box component="nav" aria-label="Category filters">
					{categories.isLoading && (
						<Stack direction="row" spacing={1} sx={{ overflow: "hidden" }}>
							{CATEGORY_SKELETON_KEYS.map((key) => (
								<Skeleton
									key={key}
									variant="rounded"
									width={120}
									height={40}
									sx={{ borderRadius: 999, flex: "none" }}
								/>
							))}
						</Stack>
					)}

					{categories.isError && (
						<Alert severity="error" sx={{ maxWidth: 400 }}>
							Failed to load categories
						</Alert>
					)}

					{categories.data && (
						<Box
							component="ul"
							ref={setPillRow}
							sx={{
								display: "flex",
								gap: 1,
								overflowX: "auto",
								listStyle: "none",
								// Inset padding keeps the focus ring and hover shadow from being clipped
								m: 0,
								mx: -0.5,
								p: 0.5,
								scrollbarWidth: "none",
								"&::-webkit-scrollbar": { display: "none" },
								maskImage: pillRowOverflows
									? "linear-gradient(to right, black calc(100% - 32px), transparent)"
									: "none",
							}}
						>
							<Box component="li" sx={{ flex: "none" }}>
								<PhotoPill
									label="All"
									icon={<AppsIcon />}
									selected={hasFilters && !filters.category}
									onClick={() => updateFilters({ category: "" })}
								/>
							</Box>
							{categories.data.map(({ strCategory }) => {
								const isSelected = strCategory === selectedCategory;
								return (
									<Box component="li" key={strCategory} sx={{ flex: "none" }}>
										<PhotoPill
											label={strCategory}
											image={getCategoryPhoto(strCategory)}
											icon={<LocalBarIcon />}
											selected={isSelected}
											onClick={() => handleCategory(strCategory)}
										/>
									</Box>
								);
							})}
						</Box>
					)}
				</Box>

				<Stack
					direction="row"
					spacing={1.5}
					useFlexGap
					sx={{ alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}
				>
					<ToggleButtonGroup
						exclusive
						size="small"
						aria-label="Alcohol"
						value={filters.alcoholic}
						onChange={(_event, value: AlcoholicFilter | null) => {
							if (value !== null) {
								updateFilters({ alcoholic: value });
							}
						}}
						sx={{ bgcolor: "background.paper" }}
					>
						<ToggleButton value="">All</ToggleButton>
						<ToggleButton value="Alcoholic">Alcoholic</ToggleButton>
						<ToggleButton value="Non_Alcoholic">Non-alcoholic</ToggleButton>
					</ToggleButtonGroup>

					{count !== null && (
						<Typography
							variant="body2"
							color="text.secondary"
							aria-live="polite"
							sx={{ fontVariantNumeric: "tabular-nums" }}
						>
							{count} {count === 1 ? "drink" : "drinks"}
						</Typography>
					)}
				</Stack>

				{refinements.length > 0 && (
					<Stack
						direction="row"
						spacing={1}
						role="group"
						aria-label="Refine results"
						sx={{
							alignItems: "center",
							overflowX: "auto",
							mx: -0.5,
							p: 0.5,
							scrollbarWidth: "none",
							"&::-webkit-scrollbar": { display: "none" },
						}}
					>
						<Typography
							variant="caption"
							color="text.secondary"
							sx={{ fontWeight: 600, flex: "none" }}
						>
							Refine
						</Typography>
						{refinements.map(({ word, label, image }) => {
							const isSelected = word === activeRefine;
							return (
								<Box key={word} sx={{ flex: "none" }}>
									<PhotoPill
										label={label}
										image={image || null}
										icon={<SearchIcon />}
										selected={isSelected}
										onClick={() => updateFilters({ refine: isSelected ? "" : word })}
									/>
								</Box>
							);
						})}
					</Stack>
				)}
			</Stack>
		</>
	);
}
