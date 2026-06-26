import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

export function CardSkeleton() {
	return (
		<Card>
			<Skeleton variant="rectangular" height={256} />
			<CardContent>
				<Skeleton variant="text" width="60%" height={28} />
			</CardContent>
		</Card>
	);
}
