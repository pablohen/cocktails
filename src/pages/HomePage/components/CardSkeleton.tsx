import {
	CardContent,
	CardFooter,
	Card as ShadCard,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
	return (
		<ShadCard className="overflow-hidden border-2 bg-gradient-to-br from-card to-card/80 shadow-lg backdrop-blur-sm">
			<CardContent className="p-0">
				<Skeleton className="h-64 w-full rounded-none" />
			</CardContent>
			<CardFooter className="relative bg-gradient-to-br from-primary via-secondary to-accent p-4">
				<div className="absolute inset-0 bg-black/40" />
				<Skeleton className="relative z-10 h-6 w-32 bg-white/30" />
			</CardFooter>
		</ShadCard>
	);
}
