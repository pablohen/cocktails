import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { DetailSection } from "@/components/DetailSection";

export function DrinkDetailsSkeleton() {
	return (
		<Stack spacing={4}>
			<Skeleton variant="text" width={320} height={56} />

			<Grid container spacing={4}>
				<Grid size={{ xs: 12, lg: 5 }}>
					<Skeleton
						variant="rectangular"
						sx={{
							width: "100%",
							maxWidth: 480,
							aspectRatio: "1",
							borderRadius: 2,
						}}
					/>
				</Grid>

				<Grid size={{ xs: 12, lg: 7 }}>
					<Stack spacing={3}>
						<DetailSection title="Category" accent="primary">
							<Skeleton variant="text" width={192} height={28} />
						</DetailSection>

						<DetailSection title="Ingredients" accent="secondary">
							<Stack spacing={1}>
								<Skeleton variant="text" width={160} />
								<Skeleton variant="text" width={144} />
								<Skeleton variant="text" width={176} />
							</Stack>
						</DetailSection>

						<DetailSection title="Instructions" accent="accent">
							<Skeleton variant="rectangular" height={96} />
						</DetailSection>
					</Stack>
				</Grid>
			</Grid>
		</Stack>
	);
}
