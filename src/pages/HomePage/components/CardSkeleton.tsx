import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
	return (
		<div className="w-64 space-y-0 overflow-hidden rounded-lg border-2 bg-gradient-to-br from-card to-card/80 shadow-lg backdrop-blur-sm">
			<Skeleton className="h-64 w-full rounded-none" />
			<div className="relative bg-gradient-to-br from-primary via-secondary to-accent p-4">
				<div className="absolute inset-0 bg-black/40" />
				<Skeleton className="relative z-10 h-6 w-32 bg-white/30" />
			</div>
		</div>
	);
}
