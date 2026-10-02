import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ROW_KEYS = ["row-1", "row-2", "row-3", "row-4", "row-5"] as const;

export function DrinkDetailsSkeleton() {
	return (
		<Paper
			variant="outlined"
			sx={{
				display: "grid",
				gridTemplateColumns: { xs: "1fr", md: "5fr 6fr" },
				overflow: "hidden",
			}}
		>
			<Skeleton
				variant="rectangular"
				sx={{ width: "100%", height: "auto", aspectRatio: { xs: "4 / 3", md: "1" } }}
			/>

			<Stack spacing={3} sx={{ p: { xs: 2.5, md: 3.5 } }}>
				<Stack spacing={1.5}>
					<Skeleton variant="text" width="70%" height={48} />
					<Stack direction="row" spacing={0.75}>
						<Skeleton variant="rounded" width={88} height={24} sx={{ borderRadius: 4 }} />
						<Skeleton variant="rounded" width={72} height={24} sx={{ borderRadius: 4 }} />
					</Stack>
				</Stack>

				<Box>
					<Skeleton variant="text" width={120} />
					{ROW_KEYS.map((key) => (
						<Skeleton key={key} variant="text" height={36} />
					))}
				</Box>

				<Skeleton variant="rectangular" height={96} sx={{ borderRadius: 1 }} />
			</Stack>
		</Paper>
	);
}
